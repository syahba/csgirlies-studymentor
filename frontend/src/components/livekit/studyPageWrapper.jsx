import { LiveKitRoom } from '@livekit/components-react';
import { useLiveKitRoom } from '../../hooks/useLiveKitRoom';

export function StudyPageWrapper({ userId, children }) {
  const { room, isConnected } = useLiveKitRoom(userId);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-[var(--lighter-accent-2)] to-[var(--accent-2)]">
        <div className="text-[var(--neutral)] text-xl">Connecting to LiveKit...</div>
      </div>
    );
  }

  return (
    <LiveKitRoom room={room}>
      {children}
    </LiveKitRoom>
  );
}
