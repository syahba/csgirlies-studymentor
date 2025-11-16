import { useTracks, VideoTrack, useRoomContext, useVoiceAssistant } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

export function AgentVideo() {
  const room = useRoomContext();
  const trackRefs = useTracks([Track.Source.Camera]);

  const agentTrackRef = trackRefs.find(
    (trackRef) => trackRef.participant.identity === 'simli-avatar-agent'
  );

  // Check if there's an agent participant (even if no video)
  const hasAgentParticipant = room?.remoteParticipants &&
    Object.values(room.remoteParticipants).some(p => p.identity === 'simli-avatar-agent');

  return (
    <div className="bg-[var(--neutral)] w-[26rem] h-[26rem] rounded-full flex items-center justify-center overflow-hidden">
      {agentTrackRef ? (
        <VideoTrack
          trackRef={agentTrackRef}
          className="w-full h-full object-cover rounded-full"
        />
      ) : hasAgentParticipant ? (
        // Agent is connected but avatar video failed - show microphone with speaking indicator
        <div className="flex flex-col items-center justify-center text-[var(--black)]">
          <FontAwesomeIcon
            icon={faMicrophone}
            size="3x"
            style={{
              color: "#4f4ca0",
              marginBottom: "1rem"
            }}
          />
          <p className="text-center text-sm px-4">
            Agent connected<br/>
            <span className="text-xs opacity-75">Audio mode</span>
          </p>
        </div>
      ) : (
        <p className="text-[var(--black)]">Connecting agent...</p>
      )}
    </div>
  );
}
