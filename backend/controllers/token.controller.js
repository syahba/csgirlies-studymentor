import { AccessToken } from "livekit-server-sdk";

export const generate_token = async(req, res) => {
	console.log("generate token request");
  
  const room = req.query.room || "default-room";
  const identity =
    req.query.id || "user-" + Math.random().toString(36).substring(7);

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { identity }
  );

  at.addGrant({
    room,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  const token = await at.toJwt();
  res.json({ token });
}