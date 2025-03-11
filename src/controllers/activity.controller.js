const connectDb = require('../config/database');
const Activity = require("../models/activity.model");
const mongoose = require('mongoose'); // Import Mongoose for ObjectId validation
const fetchUserDetails = require('../utils/user');

connectDb();

const activityController = {
  // Get comments for a specific task
  getComments: async (req, res) => {
    try {
      const { taskId } = req.params;

      // Validate taskId as a valid Mongoose ObjectId
      if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }

      const comments = await Activity.find({
        taskId: taskId,
        type: 'comment'
      }).sort({ createdAt: -1 });

      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get history for a specific task
  getHistory: async (req, res) => {
    try {
      const { taskId } = req.params;

      // Validate taskId as a valid Mongoose ObjectId
      if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }

      const history = await Activity.find({
        taskId: taskId,
        type: 'history'
      }).sort({ createdAt: -1 });

      res.json(history);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all activities (both comments and history) for a specific task
  getActivities: async (req, res) => {
    try {
      const { taskId } = req.params;

      console.log(taskId)

      // Validate taskId as a valid Mongoose ObjectId
      if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }

      const activities = await Activity.find({taskId:taskId}).sort({ createdAt: -1 });

      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add a comment to a task
  addComment: async (req, res) => {
    try {
      const { taskId } = req.params;
      const { content } = req.body;
      
      const userId = req.user.id;

      

      // Validate taskId and userId as valid Mongoose ObjectIds
      if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Validate content is provided
      if (!content || typeof content !== 'string') {
        return res.status(400).json({ message: "Content is required and must be a string" });
      }

      const user = await fetchUserDetails(userId);

      const newActivity = new Activity({
        taskId: taskId,
        type: 'comment',
        content: content,
        userId: userId,
        username:user.username
      });

      const activity = await newActivity.save();
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = activityController;