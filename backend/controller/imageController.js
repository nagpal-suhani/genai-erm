const axios = require("axios");
const Job = require("../models/Job");
const FormData = require("form-data");
const fs = require("fs");

exports.sendToMLModel = async (req) => {
  try {
    
    const imagePaths = req.files.map(file => file.path);

    console.log("Received images:", imagePaths);

    const job = await Job.create({ images: imagePaths, status: "queued" });
    console.log("Created job:", job);
    const jobId = job._id;

    console.log("🚀 Processing job:", jobId);

    await Job.findByIdAndUpdate(jobId, { status: "processing" });

    const form = new FormData();
    imagePaths.forEach((path, index) => {
      form.append('files', fs.createReadStream(path));
    });

    const response = await axios.post(process.env.MODEL_API_URL, form, {
      headers: form.getHeaders(),
    });

    const result = response.data;

    await Job.findByIdAndUpdate(jobId, { result, status: "completed" });

    console.log("✅ Job completed:", jobId);

    return { success: true, jobId, result };

  } catch (error) {
    console.error(error);
    throw error;
  }
};

// New function to fetch job result/status
exports.getResults = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.json({
      success: true,
      jobId: job._id,
      status: job.status,
      result: job.result || null
    });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: "Error fetching job" });
    }
  }
};