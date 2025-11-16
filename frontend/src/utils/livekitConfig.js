import { useEffect, useState } from "react";
import { connect, Room } from "livekit-client";
import { useSelector } from "react-redux";

export const useLiveKitRoom = () => {
  const [room, setRoom] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const session = useSelector((state) => state.setup); // your session slice

  useEffect(() => {
    const initRoom = async () => {
      try {
        // 1️⃣ Fetch token from backend
        const tokenRes = await fetch("http://localhost:3001/api/v1/token/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomName: session.roomName || "example_room",
            topic: session.topic,
            files: session.uploadedPaths, // use uploaded paths from Redux
          }),
        });

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

        // 3️⃣ Optional participant events
        room.on("participantConnected", (participant) => {
          console.log("Participant joined:", participant.identity);
        });

        room.on("participantDisconnected", (participant) => {
          console.log("Participant left:", participant.identity);
        });
      } catch (err) {
        console.error("Error connecting to LiveKit room:", err);
      }
    };

    if (session.roomName) {
      initRoom();
    }

    return () => {
      room?.disconnect();
    };
  }, [session.roomName, session.topic, session.uploadedPaths]);

  return { room, isConnected };
};