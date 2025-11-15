import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AccessToken } from "livekit-server-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.listen(3001, () => {
  console.log("backend running on http://localhost:3001");
});