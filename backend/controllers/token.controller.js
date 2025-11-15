import { AccessToken } from "livekit-server-sdk";

export const generate_token = async (req, res) => {
  try {
    console.log("generate token request");

    const room = req.query.roomId || "default-room";
    const identity = req.query.id;

    const textInputs = req.body.input || "";
    const filePaths = req.body.filePaths || [];
    const mentorId = req.body.mentorId || null;

    // The combined metadata for the agent
    const session_context = {
      textInputs,
      filePaths,
      mentorId
    };

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: identity,
        metadata: JSON.stringify(session_context)   // MUST BE STRING
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