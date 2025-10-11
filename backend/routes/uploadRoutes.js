const express= require("express");
const multer= require("multer");
const path= require("path");

const router= express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

// Post route
router.post("/", upload.array("images",5), (req,res)=>{
    const imagePaths = req.files.map(file => file.path);
    res.json({
        message: "Images uploaded successfully",
        images: imagePaths
    });
})

module.exports = router;