import { Router } from "express";
import { generate_token } from "../controllers/token.controller.js";

const tokenRouter = Router();

tokenRouter.post("/get", generate_token)

export default tokenRouter