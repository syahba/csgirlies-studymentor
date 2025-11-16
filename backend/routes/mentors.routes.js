import { Router } from "express";
import { get_mentor_by_Id } from "../controllers/mentor.controller.js";

const mentorRouter = Router();

mentorRouter.get("/getId", get_mentor_by_Id)


export default mentorRouter