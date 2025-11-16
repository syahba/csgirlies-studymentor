import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import authRouter from "./routes/auth.routes.js"
import tokenRouter from "./routes/token.route.js";
import fileRouter from "./routes/file.route.js";
import mentorRouter from "./routes/mentors.routes.js";
import sessionRouter from "./routes/session.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/token", tokenRouter);
app.use("/api/v1/file", fileRouter);
app.use("/api/v1/mentor", mentorRouter);
app.use("/api/v1/session", sessionRouter)

app.get('/',(req, res) => {
  console.log('request')
  res.status(200).send("OK")
})
app.listen(3001, 'localhost', () => {
  console.log("Backend running at http://localhost:3001");
});