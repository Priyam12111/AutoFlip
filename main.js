const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { PDFDocument, degrees } = require("pdf-lib");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed."));
    }
    cb(null, true);
  },
});

app.post("/rotate-pdf", upload.single("pdf"), async (req, res) => {
  const angle = parseInt(req.body.angle, 10); // Rotation angle from request body
  const pageNumbers = req.body.pages ? JSON.parse(req.body.pages) : []; // Page numbers to rotate

  if (!req.file || isNaN(angle) || pageNumbers.length === 0) {
    return res
      .status(400)
      .send(
        "Please provide a valid PDF file, rotation angle, and page numbers."
      );
  }

  try {
    const existingPdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Loop through each page number and rotate it
    pageNumbers.forEach((pageNum) => {
      const page = pdfDoc.getPage(pageNum);
      page.setRotation(degrees(angle));
    });

    const pdfBytes = await pdfDoc.save();
    const outputPdfPath = path.join("uploads", `rotated-${Date.now()}.pdf`);
    console.log("File send");
    fs.writeFileSync(outputPdfPath, pdfBytes);

    res.download(outputPdfPath, "rotated-output.pdf", () => {
      fs.unlinkSync(req.file.path);
      fs.unlinkSync(outputPdfPath);
    });
  } catch (error) {
    console.error("Error rotating the PDF:", error);
    res.status(500).send("Failed to rotate the PDF.");
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send(err.message);
  }
  next(err);
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
