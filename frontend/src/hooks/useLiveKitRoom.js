import { useEffect, useState } from "react";
import { connect } from "livekit-client";
import { useSelector } from "react-redux";

export const useLiveKitRoom = (userId) => {
  const [room, setRoom] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const session = useSelector((state) => state.setup);

  useEffect(() => {
    const initRoom = async () => {
      try {
        // 1️⃣ Fetch token
        const tokenRes = await fetch(
          `http://localhost:3001/api/v1/token/get?room_name=${session.room_name}&userId=${userId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              file_paths: session.file_paths,
              mentorId: session.mentorId,
              input: session.input,
            }),
          }
        );

        const tokenData = await tokenRes.json();
        if (!tokenData?.token || !tokenData?.url) {
          console.error("Invalid token data:", tokenData);
          return;
        }

        // 2️⃣ Connect to LiveKit room
        const room = await connect(tokenData.url, tokenData.token, {
          autoSubscribe: true,
        });

        setRoom(room);
        setIsConnected(true);

        room.on("participantConnected", (p) => console.log("Joined:", p.identity));
        room.on("participantDisconnected", (p) => console.log("Left:", p.identity));
      } catch (err) {
        console.error("Error connecting to LiveKit room:", err);
      }
    };

    if (session.room_name) {
      initRoom();
    }

    return () => room?.disconnect();
  }, [session.room_name, session.input, session.file_paths, session.mentorId, userId]);

  return { room, isConnected };
};