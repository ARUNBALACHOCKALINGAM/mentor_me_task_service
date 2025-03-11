const axios = require('axios');
const redisClient = require('../../redisClient'); // Import the Redis client

const fetchUserDetails = async (userId) => {
  try {
    // Check Redis for cached user details
    const cachedUser = await redisClient.get(`user:${userId}`);

    if (cachedUser) {
      console.log('Returning cached user data');
      return JSON.parse(cachedUser); // Parse the cached data
    }

    // If not in cache, fetch from the external service
    console.log('Fetching user data from external service');
    const response = await axios.get(`http://localhost:8000/user/${userId}`);
    const userData = response.data;

    // Store the fetched data in Redis with an expiration time (e.g., 1 hour)
    await redisClient.set(`user:${userId}`, JSON.stringify(userData), {
      EX: 3600, // Cache expiration time in seconds (1 hour)
    });

    return userData;
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    throw new Error('Failed to fetch user details');
  }
};

module.exports = fetchUserDetails;