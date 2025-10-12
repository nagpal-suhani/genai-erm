// Required files
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();


// Body parser with limits for file uploads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Logging middleware
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  console.log("Headers:", req.headers);
  next();
});

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Database connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.json({ 
    message: "Backend is running",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    path: req.path
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path
  });
});

// Server starts
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Base URL: http://localhost:${PORT}`);
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
