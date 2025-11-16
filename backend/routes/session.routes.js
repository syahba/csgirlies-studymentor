import { get_sessions, create_session } from "../controllers/session.controller.js";
import { Router } from "express";

const sessionRouter = Router();

sessionRouter.get('/all', get_sessions);

// call this after generating room_name, and upload, before connecting to session
sessionRouter.post('/add', create_session);

export default sessionRouter;