// [Previous imports]
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParticipants, RoomAudioRenderer, useLocalParticipant } from "@livekit/components-react";
import Navbar from "../components/common/Navbar";
import {
  faEye,
  faMicrophone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../components/common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRoomContext } from "@livekit/components-react";
import { AgentVideo } from "../components/livekit/videoComponent";
import { StudyPageWrapper } from "../components/livekit/studyPageWrapper";
import FlashCardContainer from "../components/flashcard/FlashCardContainer";
import LLMTextDisplay from "../components/common/LLMTextDisplay";

function StudyPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <StudyPageWrapper userId={user.userId}>
      <StudyPageContent navigate={navigate} />
    </StudyPageWrapper>
  );
}

function StudyPageContent({ navigate }) {
  const { localParticipant } = useLocalParticipant();
  const room = useRoomContext();
  const roomName = useSelector((state) => state.setup.room_name);
  const [micEnabled, setMicEnabled] = useState(true);

  useEffect(() => {
    localParticipant.setMicrophoneEnabled(true);
  }, [localParticipant]);

  const handleExitSession = async () => {
    try {
      // Trigger session summary generation
      if (room && roomName) {
        console.log("Generating session summary for room:", roomName);

        // Find the agent participant and send RPC to trigger summary generation
        const participants = room.remoteParticipants;
        const agentParticipant = Object.values(participants).find(p =>
          p.identity === 'simli-avatar-agent'
        );

        if (agentParticipant) {
          await room.localParticipant.performRpc({
            destinationIdentity: agentParticipant.identity,
            method: "generateSessionSummary",
            payload: JSON.stringify({ room_name: roomName })
          });
          console.log("Session summary generation triggered");
        }
      }

      // Navigate back to home (this will trigger the cleanup in StudyPageWrapper)
      navigate("/");
    } catch (error) {
      console.error("Error during session exit:", error);
      // Still navigate even if summary generation fails
      navigate("/");
    }
  };

  return (
    <div className="bg-linear-to-tr from-[var(--lighter-accent-2)] to-[var(--accent-2)] min-h-screen">
      <RoomAudioRenderer />
      <Navbar accentColor={"red"}></Navbar>

      <div className="flex flex-col gap-8 mt-2">
        <div className="flex justify-around">
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon={faEye}
              size="lg"
              style={{
                color: "#4f4ca0",
                backgroundColor: "var(--neutral)",
                padding: "6.5px 5px",
                borderRadius: "50%",
                boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            />
            <FontAwesomeIcon
              icon={faMicrophone}
              size="lg"
              style={{
                color: "#4f4ca0",
                backgroundColor: "var(--neutral)",
                padding: "6.5px 5px",
                borderRadius: "50%",
                boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            />
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            style={{
              color: "#4f4ca0",
              backgroundColor: "var(--neutral)",
              padding: "6.5px 5px",
              borderRadius: "50%",
              boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={handleExitSession}
          />
        </div>

        <div className="flex justify-center items-center gap-20">
          <div className="flex flex-col items-center justify-center gap-8">
            <AgentVideo />
            <LLMTextDisplay />
          </div>

          <div className="flex flex-col items-end">
            <div className="w-[30rem] max-h-[30rem] overflow-auto bg-[var(--neutral)] p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.1)] rounded-3xl text-body text-[var(--black)]">
              <p className="mb-4">
                Thank you for explaining! From what you shared, you already
                understand the basic idea of an ecosystem — especially how
                living things interact with their environment. That’s a really
                solid start ✨{" "}
              </p>
              <p className="">Here are the parts you explained well: </p>
              <ol>
                <li>
                  You recognized that an ecosystem includes biotic and abiotic
                  components
                </li>
                <li>
                  You mentioned that organisms depend on each other for survival
                </li>
                <li>
                  You identified simple examples like food relationships in
                  nature 🌱
                </li>
              </ol>
              <p className="mt-4">
                And here are a few areas we can strengthen together:
              </p>
              <ol>
                <li>
                  How energy flows through an ecosystem (producers → consumers →
                  decomposers)
                </li>
                <li>The difference between food chains vs. food webs</li>
                <li>
                  {" "}
                  How changes in one population can affect the entire ecosystem
                  balance
                </li>
                <li>
                  The idea of trophic levels and how energy decreases at each
                  level
                </li>
              </ol>
              <p className="mt-4">Let me explain one of them clearly:</p>
              <p>
                {" "}
                Energy in an ecosystem always starts with the sun, which plants
                (producers) convert into energy. Herbivores eat the plants,
                carnivores eat the herbivores, and decomposers break everything
                down — returning nutrients to the soil. Each step is a trophic
                level, and energy drops as it moves up.
              </p>
            </div>
            <div className="mt-6 mb-10">
              <PrimaryButton
                isBig={true}
                text={"Re-explain"}
                bgColor={"purple"}
              ></PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Card Container */}
      <FlashCardContainer />
    </div>
  );
}

export default StudyPage;
