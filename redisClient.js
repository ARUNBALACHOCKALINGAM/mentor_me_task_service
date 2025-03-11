const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  url: 'redis://localhost:6379',
});

// Handle connection errors
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
redisClient.connect();

module.exports = redisClient