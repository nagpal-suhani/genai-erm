const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { sendToMLModel, getResults } = require("../controller/imageController");

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

// POST route → handles multiple file uploads
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    // file URLs served from /uploads in server.js
    const fileURLs = req.files.map(
      (file) => `/uploads/${path.basename(file.path)}`
    );

    // Optional: if you still want to trigger ML model
    await sendToMLModel(req, res);

    // Return success + file URLs for frontend preview
    res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      files: fileURLs,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

// GET route → fetch job status
router.get("/status/:jobId", getResults);

module.exports = router;
