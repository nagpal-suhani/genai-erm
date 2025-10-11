const mongoose= require("mongoose");

const jobSchema= new mongoose.Schema({
    images:[String],
    result: Object,
    status:{type: String, default: "processing"},
    createdAt:{type: Date, default: Date.now},
});

module.exports= mongoose.model("Job", jobSchema);