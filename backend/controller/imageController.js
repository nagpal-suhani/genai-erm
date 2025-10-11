const axios= require("axios");

// controller function to upload images
exports.sendToMLModel = async(req,res)=>{
    try{
        const imagePaths = req.files.map(file => file.path);

        const job = await Job.create({ images: imagePaths });

        const payload= {images: imagePaths};
        const response= await axios.post(process.env.MODEL_API_URL, payload);

        job.result = response.data;
        job.status = "completed";
        await job.save();

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