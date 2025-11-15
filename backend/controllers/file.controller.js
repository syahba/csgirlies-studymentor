import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const upload_files = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedFiles = req.files.map((file) => ({
      id: path.basename(file.filename, path.extname(file.filename)),
      originalName: file.originalname,
      path: file.path,
    }));

    res.status(200).json({ files: uploadedFiles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

/* ============================================================
   GENERATE SUMMARY PDF
============================================================ */
export const generateSummaryPDF = async (req, res) => {
  try {
    const { roomId, summary } = req.body;

    if (!roomId || !summary) {
      return res
        .status(400)
        .json({ error: "roomId and summary are required" });
    }

    const summariesDir = path.resolve("./summaries");
    if (!fs.existsSync(summariesDir)) {
      fs.mkdirSync(summariesDir, { recursive: true });
    }

    const filePath = path.join(summariesDir, `${roomId}_summary.pdf`);
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

/* ============================================================
   DOWNLOAD SUMMARY PDF
============================================================ */
export const downloadSummaryPDF = (req, res) => {
  const roomId = req.params.roomId || req.query.roomId;

  if (!roomId) {
    return res.status(400).json({ error: "roomId is required" });
  }

  const filePath = path.resolve(`./summaries/${roomId}_summary.pdf`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "PDF not found" });
  }

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${roomId}_summary.pdf`
  );
  res.setHeader("Content-Type", "application/pdf");

  fs.createReadStream(filePath).pipe(res);
};