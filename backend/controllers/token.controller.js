import { AccessToken } from "livekit-server-sdk";

export const generate_token = async (req, res) => {
  try {
    console.log("generate token request");

    const room = req.query.room_name || "default-room";
    // room_name should be unique and text
    const identity = req.query.userId;

    const textInput = req.body.input || "";
    const filePaths = req.body.filePaths || [];
    const mentorId = req.body.mentorId || null;

    const session_context = {
      textInput,
      filePaths,
      mentorId
    };

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: identity,
        metadata: JSON.stringify(session_context)   
      }
    );

    at.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });

    const token = await at.toJwt();
    res.json({ token });

  } catch (err) {
    console.error("Token generation failed:", err);
    res.status(500).json({ error: "Failed to generate token" });
  }
};