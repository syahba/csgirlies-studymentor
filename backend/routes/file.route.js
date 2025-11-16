import { Router } from "express";
import { upload_files, generateSummaryPDF, downloadSummaryPDF} from "../controllers/file.controller.js";
import { upload } from "../utils/storage.js";

const fileRouter = Router();

fileRouter.post("/upload", upload.array("files"), upload_files)
fileRouter.post("/generatePDF", generateSummaryPDF)
fileRouter.get("/download", downloadSummaryPDF)

export default fileRouter