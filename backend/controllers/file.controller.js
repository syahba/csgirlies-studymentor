import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const upload_files = async(req, res) => {
  try {
    console.log("runnign upload file")
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

export const generateSummaryPDF = async (req, res) => {
  try {
    const { roomId, summary } = req.body;
    console.log("Running generate PDF");

    if (!roomId || !summary) {
      return res.status(400).json({ error: "roomId and summary are required" });
    }

    // Ensure summaries folder exists
    const summariesDir = path.resolve('./summaries');
    if (!fs.existsSync(summariesDir)) {
      fs.mkdirSync(summariesDir, { recursive: true });
    }

    const filePath = path.join(summariesDir, `${roomId}_summary.pdf`);

    // Create a write stream
    const stream = fs.createWriteStream(filePath);

    // Handle stream errors
    stream.on('error', (err) => {
      console.error('Stream error:', err);
      return res.status(500).json({ error: 'Failed to write PDF file' });
    });

    // Create PDF
    const doc = new PDFDocument();
    doc.pipe(stream);
    doc.text(summary, { align: 'left' });
    doc.end();

    // Respond when PDF is finished
    stream.on('finish', () => {
      console.log('PDF generation finished');
      return res.json({ message: 'PDF generated', path: filePath });
    });

  } catch (err) {
    console.error('PDF generation error:', err);
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
};

export const downloadSummaryPDF = (req, res) => {
  const { roomId } = req.query;
  console.log("running download pdf")
  if (!roomId) {
    return res.status(400).json({ error: "roomId is required" });
  }

  const filePath = path.resolve(`./summaries/${roomId}_summary.pdf`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "PDF not found" });
  }

  res.setHeader('Content-Disposition', `attachment; filename=${roomId}_summary.pdf`);
  res.setHeader('Content-Type', 'application/pdf');

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
};