# agent.py — Minimal working LiveKit Agent (no Simli), chaotic-bestie persona, flashcards, Ollama LLM
import asyncio
import json
import uuid
from dataclasses import dataclass, field
from typing import Optional, List, Any
from dotenv import load_dotenv
import os

from livekit import agents
from livekit.agents import Agent, AgentSession, JobContext, cli, llm as lkllm
from livekit.agents.llm import function_tool
from livekit.plugins import deepgram, openai

# Load environment variables
load_dotenv()

LIVEKIT_URL = os.getenv("LIVEKIT_URL")
LIVEKIT_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_SECRET = os.getenv("LIVEKIT_API_SECRET")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3001")

if not LIVEKIT_URL or not LIVEKIT_KEY or not LIVEKIT_SECRET:
    raise ValueError("LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET are required")

# ---- Data classes ----
@dataclass
class FlashCard:
    id: str
    question: str
    answer: str
    is_flipped: bool = False

@dataclass
class UserData:
    ctx: Optional[JobContext] = None
    flash_cards: List[FlashCard] = field(default_factory=list)

    def add_flash_card(self, question: str, answer: str) -> FlashCard:
        card = FlashCard(id=str(uuid.uuid4()), question=question, answer=answer)
        self.flash_cards.append(card)
        return card

    def flip_flash_card(self, card_id: str) -> Optional[FlashCard]:
        for c in self.flash_cards:
            if c.id == card_id:
                c.is_flipped = not c.is_flipped
                return c
        return None

# ---- Personality + instructions (chaotic bestie) ----
AGENT_INSTRUCTIONS = r"""
You are a chaotic bestie: loud, dramatic, unfiltered, and extremely supportive.
Be playful, sassy, and encouraging. Use light roasts lovingly, emojis occasionally,
and always end with a hype boost. Keep responses clear and never give harmful advice.

Core capabilities:
- Answer study questions clearly and helpfully.
- Create flashcards using the create_flash_card(context, question, answer) function.
- Flip a card using flip_flash_card(context, card_id).
- Generate session summaries (internal).

Behavior rules:
- Be chaotic but not confusing.
- Be supportive first, chaotic second.
- Use friendly interjections and end with a hype line.
"""

# ---- Custom Agent ----
class MyAgent(Agent):
    def __init__(self) -> None:
        # Use Ollama LLM backend (via livekit.agents.llm)
        # Ensure you have an Ollama server configured if using this model.
        llm_backend = lkllm.Ollama(model="llama2")  # adjust model name if needed

        super().__init__(
            instructions=AGENT_INSTRUCTIONS,
            stt=deepgram.STT(),
            llm=llm_backend,
            tts=openai.TTS(voice="alloy"),  # optional: requires OpenAI TTS setup if used
        )
        # pending containers for async-scheduled tasks
        self._pending_flashcards: List[tuple] = []
        self._pending_summaries: List[str] = []
        self._pending_responses: List[str] = []

    # function_tool methods must include typed `context` param so LiveKit can build schemas
    @function_tool
    async def create_flash_card(self, context: JobContext, question: str, answer: str) -> str:
        """Create a flash card and try to send it to the first participant.
        If participants aren't present yet, buffer it for on_enter to deliver.
        """
        userdata: UserData = context.userdata
        card = userdata.add_flash_card(question, answer)

        # If room and participant are available, send immediately
        room = context.room
        if room and len(room.remote_participants) > 0:
            await self._send_flashcard_to_first(room, card)
            return f"Created a flash card: {question}"
        else:
            # buffer to send later in on_enter
            self._pending_flashcards.append(card)
            return f"Created and queued a flash card: {question}"

    @function_tool
    async def flip_flash_card(self, context: JobContext, card_id: str) -> str:
        """Flip an existing flash card and notify the client via RPC."""
        userdata: UserData = context.userdata
        card = userdata.flip_flash_card(card_id)
        if not card:
            return f"Flash card with id {card_id} not found."
        room = context.room
        if room and len(room.remote_participants) > 0:
            await self._send_flip_to_first(room, card)
            return f"Flipped flash card {card_id}"
        else:
            return f"Flipped flash card locally (no participants to notify): {card_id}"

    @function_tool
    async def generate_session_summary(self, context: JobContext, room_name: str) -> str:
        """Schedule a session summary generation that runs asynchronously."""
        # buffer and return immediate acknowledgement
        self._pending_summaries.append(room_name)
        # schedule background generation
        asyncio.create_task(self._generate_pdf_summary(room_name))
        return f"Session summary scheduled for room: {room_name}"

    # ---- helper RPC senders ----
    async def _send_flashcard_to_first(self, room: Any, card: FlashCard) -> None:
        participants = list(room.remote_participants.values())
        if not participants:
            print("No remote participants; cannot send flashcard")
            return
        target = participants[0]
        payload = {
            "action": "show",
            "id": card.id,
            "question": card.question,
            "answer": card.answer,
            "index": len(room.local_participant.identity) if hasattr(room.local_participant, "identity") else 0
        }
        try:
            await room.local_participant.perform_rpc(
                destination_identity=target.identity,
                method="client.flashcard",
                payload=json.dumps(payload),
            )
            print("Flashcard sent:", card.id)
        except Exception as e:
            print("Failed to send flashcard RPC:", e)

    async def _send_flip_to_first(self, room: Any, card: FlashCard) -> None:
        participants = list(room.remote_participants.values())
        if not participants:
            print("No remote participants; cannot send flip")
            return
        target = participants[0]
        payload = {"action": "flip", "id": card.id}
        try:
            await room.local_participant.perform_rpc(
                destination_identity=target.identity,
                method="client.flashcard",
                payload=json.dumps(payload),
            )
            print("Flip sent for:", card.id)
        except Exception as e:
            print("Failed to send flip RPC:", e)

    async def _generate_pdf_summary(self, room_name: str) -> Optional[str]:
        """Background PDF generation (async)."""
        try:
            prompt = (
                "Generate a concise session summary: main topics, key concepts, flashcards created, "
                "important Q&A, and next steps. Keep it student-friendly."
            )
            # Ask the LLM for a summary text
            summary = await self.llm.ask(prompt)
            print("Summary generated (truncated):", summary[:200])

            import aiohttp
            payload = {"room_name": room_name, "summary": summary}
            async with aiohttp.ClientSession() as s:
                async with s.post(f"{BACKEND_URL}/api/v1/file/generatePDF", json=payload) as resp:
                    if resp.status == 200:
                        resj = await resp.json()
                        print("PDF generation success:", resj)
                        return resj.get("download_url") or ""
                    else:
                        txt = await resp.text()
                        print("PDF generation failed:", resp.status, txt)
                        return None
        except Exception as e:
            print("Error generating PDF summary:", e)
            return None

    # ---- lifecycle hook: safe on_enter ----
    async def on_enter(self) -> None:
        """Called when session starts. Wait for participants, then flush pending items."""
        # give room a little time to initialize
        await asyncio.sleep(0.5)

        # wait for remote participant(s) to join (timeout ~10s)
        room = self.session.room
        waited = 0
        while room and len(room.remote_participants) == 0 and waited < 20:
            await asyncio.sleep(0.5)
            waited += 1

        # flush queued flashcards
        if hasattr(self, "_pending_flashcards") and self._pending_flashcards:
            for card in list(self._pending_flashcards):
                # ensure card is FlashCard instance (if created earlier)
                if isinstance(card, FlashCard):
                    await self._send_flashcard_to_first(room, card)
                else:
                    # if only (question, answer) tuple
                    try:
                        question, answer = card
                        created = UserData().add_flash_card(question, answer)
                        await self._send_flashcard_to_first(room, created)
                    except Exception:
                        pass
            self._pending_flashcards = []

        # greet once clients are (likely) present — chaotic bestie greeting
        try:
            await self.session.send_text("OMG BESTIEEEEE I'm here!!! 😭✨ What are we studying today?")
        except Exception as e:
            print("Failed to greet via session.send_text:", e)

# ---- Entry point for the worker ----
async def entrypoint(ctx: JobContext):
    print("Agent job starting. Room:", getattr(ctx.room, "name", "unknown"))
    await ctx.connect()

    # Attach userdata to session
    userdata = UserData(ctx=ctx)
    session = AgentSession[UserData](userdata=userdata)

    # Create agent and set session
    agent = MyAgent()

    # Register RPC handlers on the local participant for client->agent actions
    async def handle_flip_rpc(rpc_data):
        """Client calls this to notify the agent a flashcard was flipped locally."""
        try:
            payload_str = rpc_data.payload
            payload = json.loads(payload_str)
            card_id = payload.get("id")
            if card_id:
                userdata.flip_flash_card(card_id)
                print("Flip processed for card:", card_id)
            return None
        except Exception as e:
            print("Error in handle_flip_rpc:", e)
            return f"error: {str(e)}"

    async def handle_get_llm_response(rpc_data):
        """Client requests a one-off LLM response (synchronous RPC)."""
        try:
            payload = json.loads(rpc_data.payload)
            prompt = payload.get("prompt", "")
            if not prompt:
                return {"response": "No prompt provided"}
            resp = await agent.llm.ask(prompt)
            return {"response": resp}
        except Exception as e:
            print("Error in handle_get_llm_response:", e)
            return {"response": f"error: {str(e)}"}

    # register RPCs
    ctx.room.local_participant.register_rpc_method("agent.flipFlashCard", handle_flip_rpc)
    ctx.room.local_participant.register_rpc_method("agent.getLLMResponse", handle_get_llm_response)

    # start the session and attach agent
    await session.start(agent=agent, room=ctx.room)
    # store session reference in agent so it can access session.room, etc.
    agent.session = session

    # final greeting via speech/text
    try:
        await session.send_text("Hello! I'm your chaotic bestie study assistant. Ask me anything!")
    except Exception as e:
        print("Error sending greeting:", e)

# ---- run the worker ----
if __name__ == "__main__":
    cli.run_app(
        agents.WorkerOptions(
            entrypoint_fnc=entrypoint,
            ws_url=LIVEKIT_URL,
            api_key=LIVEKIT_KEY,
            api_secret=LIVEKIT_SECRET,
            port=8080,
        )
    )

