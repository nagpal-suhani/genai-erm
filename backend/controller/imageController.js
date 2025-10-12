const axios= require("axios");
const Job = require("../models/Job");
const mlQueue = require("../queues/mlQueue");

// controller function to upload images
exports.sendToMLModel = async(req,res)=>{
    try{
        const imagePaths = req.files.map(file => file.path);

        const job = await Job.create({ images: imagePaths, status: "queued",});

        await mlQueue.add("processML", {
            jobId: job._id.toString(),
            images: imagePaths,
        });

        res.json({
            message:"Image processing successful",
            jobId: job._id,
            result: job.result
        });
    }
    catch(error){
        console.error(error);
        const job = await Job.create({
            images: req.files.map(f => f.path),
            status: "failed"
        });
        res.status(500).json({ error: "Error processing images", jobId: job._id});
    }
}

exports.getResults= async (req, res) => {
  const Job = require("../models/Job"); // import Job model

  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}