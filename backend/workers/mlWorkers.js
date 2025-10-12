const { Worker } = require("bullmq");
const { Redis } = require("ioredis");
const axios = require("axios");
const Job = require("../models/Job");


const connection = new Redis({
    maxRetriesPerRequest: null,
});

const worker = new Worker("ml-jobs", async (job) => {
    console.log("🚀 Processing job:", job.id);
    const { jobId, images } = job.data;

    try {

        await Job.findByIdAndUpdate(jobId, { status: "processing" });

        const response = await axios.post(process.env.MODEL_API_URL, { images });
        const result = response.data;

        await Job.findByIdAndUpdate(jobId, {
        result,
        status: "completed",
        });

        console.log("✅ Job completed:", jobId);
    } catch (err) {
        console.error("❌ Worker error:", err);
        await Job.findByIdAndUpdate(jobId, { status: "failed" });
    }
}, { connection });

console.log("ML Worker started and listening for jobs...");