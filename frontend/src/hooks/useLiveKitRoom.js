import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConnected } from "../redux/slices/setupSlice";
import { Room } from "livekit-client";


export const useLiveKitRoom = (userId) => {
  const [room, setRoom] = useState(null);
  const session = useSelector((state) => state.setup);
  const dispatch = useDispatch();

  useEffect(() => {
    let liveRoom;     
    console.log("running use livekit room")
    const initRoom = async () => {
      try {
        // 1️⃣ Fetch token
        const tokenRes = await fetch(
          `http://localhost:3001/api/v1/token/get?room_name=${session.room_name}&userId=d506456a-d099-4df4-b7f0-68b6bf740f97`,
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
        if (!tokenData?.token) {
          console.error("Invalid token data:", tokenData);
          return;
        }
        console.log("token :: ", tokenData.token)

        // 2️⃣ Connect to LiveKit room
        liveRoom = new Room();
        try {
          const livekit_url = import.meta.env.VITE_LIVEKIT_URL
          console.log(livekit_url)
          await liveRoom.connect(livekit_url, tokenData.token, {
            autoSubscribe: true,
          });
  
        } catch (error) {
          console.log(error);
          
        }
        setRoom(liveRoom);
        dispatch(setConnected(true)); // ✅ Update Redux state

        liveRoom.on("participantConnected", (p) => console.log("Joined:", p.identity));
        liveRoom.on("participantDisconnected", (p) => console.log("Left:", p.identity));
      } catch (err) {
        console.error("Error connecting to LiveKit room:", err);
        dispatch(setConnected(false)); // failed to connect
      }
    };

    if (session.room_name) {
      initRoom();
    }

    return () => {
      if (liveRoom) {
        liveRoom.disconnect();
        dispatch(setConnected(false)); // reset on disconnect
      }
    };
  }, [session.room_name, session.input, session.file_paths, session.mentorId, userId, dispatch]);

  return { room, isConnected: session.connected }; // now reflects Redux state
};
