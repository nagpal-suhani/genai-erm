const { Queue } = require("bullmq");
const { Redis } = require("ioredis");

const redisConnection = new Redis(); // default localhost:6379

// Create a queue for ML jobs
const mlQueue = new Queue("ml-jobs", {
  connection: redisConnection
});

module.exports = mlQueue;