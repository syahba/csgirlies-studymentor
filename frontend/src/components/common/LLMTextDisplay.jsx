import { useState, useEffect } from "react";
import { useRoomContext } from "@livekit/components-react";

function LLMTextDisplay() {
  const room = useRoomContext();
  const [response, setResponse] = useState("Hello! I'm your study assistant. Ready to help you learn!");
  const [loading, setLoading] = useState(false);

  const getRandomPrompt = () => {
    const prompts = [
      "Tell me an interesting fact about the topic we're studying",
      "What's something important to remember about this subject?",
      "Can you give me a quick summary of the key points?",
      "What's the most challenging concept here?",
      "How would you explain this to a friend?",
      "What are some real-world applications of this topic?",
      "Give me a study tip for this subject",
      "What's a common misconception about this topic?"
    ];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const fetchLLMResponse = async (prompt) => {
    if (!room) return;

    try {
      setLoading(true);

      // Find agent participant
      const agentParticipant = Object.values(room.remoteParticipants).find(p =>
        p.identity === 'simli-avatar-agent'
      );

      if (agentParticipant) {
        console.log("Requesting LLM response:", prompt);

        const result = await room.localParticipant.performRpc({
          destinationIdentity: agentParticipant.identity,
          method: "agent.getLLMResponse",
          payload: JSON.stringify({ prompt })
        });

        console.log("Received LLM response:", result);

        // Parse the result - it should be a JSON object with response field
        let responseText = "I couldn't process that response.";
        if (result) {
          try {
            const parsed = JSON.parse(result);
            responseText = parsed.response || "Response received but no content.";
          } catch (e) {
            responseText = result; // Fallback for non-JSON responses
          }
        }

        setResponse(responseText);
      } else {
        setResponse("Agent not connected");
      }
    } catch (error) {
      console.error("Error fetching LLM response:", error);
      setResponse("Sorry, I couldn't get a response right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleRandomFact = () => {
    fetchLLMResponse(getRandomPrompt());
  };

  const handleCustomPrompt = () => {
    const prompt = prompt("What would you like to know?", getRandomPrompt());
    if (prompt && prompt.trim()) {
      fetchLLMResponse(prompt.trim());
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Text Display Area */}
      <div className="bg-[var(--neutral)] p-4 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)] min-h-[120px] flex flex-col justify-center">
        <div className="text-[var(--black)] text-body leading-relaxed">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--primary)]"></div>
              <span>Thinking...</span>
            </div>
          ) : (
            response
          )}
        </div>
      </div>

      {/* Button Controls */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleRandomFact}
          disabled={loading}
          className="bg-[var(--secondary)] hover:bg-[var(--darker-secondary)] disabled:opacity-50 text-[var(--black)] px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-sm"
        >
          Random Fact
        </button>
        <button
          onClick={handleCustomPrompt}
          disabled={loading}
          className="bg-[var(--primary)] hover:bg-[var(--darker-primary)] disabled:opacity-50 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-sm"
        >
          Ask Question
        </button>
      </div>
    </div>
  );
}

export default LLMTextDisplay;
