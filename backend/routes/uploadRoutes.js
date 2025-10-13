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
    // Generate file URLs for frontend preview
    const fileURLs = req.files.map(
      (file) => `/uploads/${path.basename(file.path)}`
    );

    // Trigger ML model and get result (sendToMLModel returns data, does not use res)
    const mlResult=await sendToMLModel(req);

    // Send a single response with both file URLs and ML result
    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      files: fileURLs,
      mlResult,
    });
    
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
});

// GET route → fetch job status
router.get("/status/:jobId", getResults);

module.exports = router;
