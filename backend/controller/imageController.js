const axios = require("axios");
const Job = require("../models/Job");
const FormData = require("form-data");
const fs = require("fs");

exports.sendToMLModel = async (req) => {
  try {
    
    const imagePaths = req.files.map(file => file.path);

    const years = [req.body['year[0]'], req.body['year[1]'], req.body['year[2]']];
    if (!req.files || req.files.length === 0) {
      throw new Error("No images uploaded");
    }

    if (!req.body['year[0]'] || !req.body['year[1]'] || !req.body['year[2]']) {
      throw new Error("Missing year fields in the form");
    }

    console.log("Received images:", imagePaths);
    console.log("Received years:", years);

    const job = await Job.create({ images: imagePaths, years, status: "queued" });
    console.log("Created job:", job);
    const jobId = job._id;

    console.log("🚀 Processing job:", jobId);

    await Job.findByIdAndUpdate(jobId, { status: "processing" });

    const form = new FormData();
    imagePaths.forEach(path => form.append("files", fs.createReadStream(path)));
    years.forEach((y, i) => form.append(`years[${i}]`, y));

    const response = await axios.post(process.env.MODEL_API_URL, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    const result = response.data;

    await Job.findByIdAndUpdate(jobId, { result, status: "completed" });

    console.log("✅ Job completed:", jobId);

    return { success: true, jobId, result };

  } catch (error) {
    console.error("❌ Error in sendToMLModel:", error.response?.data || error.message);
    await Job.findByIdAndUpdate(jobId, { status: "failed", error: error.message });
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