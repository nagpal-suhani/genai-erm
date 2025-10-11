// Required files
const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uploadRoutes = require("./routes/uploadRoutes");
require("dotenv").config();

const app= express();

// Middlewares
app.use(cors());
app.use(bodyParser.json())

// env data
PORT= process.env.PORT;

// routes
app.get("/",(req,res)=>{
    res.send("backend is running");
})

app.use("/api/upload", uploadRoutes); // frontend will use this route to upload images http://localhost:5000/api/upload

// server starts
app.listen(PORT,()=>{
    console.log("App is listening to port 5000");
})