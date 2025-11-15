import { supabase } from "../utils/supabase.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const upload_files = async (req, res) => {
  const room_name = req.query.room_name;

  if (!room_name) {
    return res.status(400).json({ message: "room_name is required" });
  }

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Create folder for each room
    const roomDir = path.resolve(`./uploads/${room_name}`);
    if (!fs.existsSync(roomDir)) {
      fs.mkdirSync(roomDir, { recursive: true });
    }

      const uploadedFiles = req.files.map((file) => {
      const fileId = path.basename(file.filename, path.extname(file.filename));
      const newFilePath = path.join(roomDir, file.originalname);

      // Move file to new directory
      fs.renameSync(file.path, newFilePath);

      return {
        id: fileId,
        originalName: file.originalname,
        path: newFilePath, 
      };
    });

    return res.status(200).json({
      room_name,
      files: uploadedFiles,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Upload failed",
      error: err.message,
    });
  }
};


export const generateSummaryPDF = async (req, res) => {
  try {
    const { room_name, summary } = req.body;

    if (!room_name || !summary) {
      return res
        .status(400)
        .json({ error: "room_name and summary are required" });
    }

    const summariesDir = path.resolve("./summaries");
    if (!fs.existsSync(summariesDir)) {
      fs.mkdirSync(summariesDir, { recursive: true });
    }

    const filePath = path.join(summariesDir, `${room_name}_summary.pdf`);
    const stream = fs.createWriteStream(filePath);

    const doc = new PDFDocument();
    doc.pipe(stream);
    doc.fontSize(14).text(summary, { align: "left" });
    doc.end();

    stream.on("finish", () => {
      res.json({ message: "PDF generated", path: filePath });
    });

    stream.on("error", (err) => {
      console.error("PDF stream error:", err);
      res.status(500).json({ error: "Failed to generate PDF" });
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return res.status(500).json({ error: "Failed to generate PDF" });
  }
};


export const downloadSummaryPDF = (req, res) => {
  const room_name = req.params.room_name || req.query.room_name;

  if (!room_name) {
    return res.status(400).json({ error: "room_name is required" });
  }

  const filePath = path.resolve(`./summaries/${room_name}_summary.pdf`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "PDF not found" });
  }

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${room_name}_summary.pdf`
  );
  res.setHeader("Content-Type", "application/pdf");

  fs.createReadStream(filePath).pipe(res);
};