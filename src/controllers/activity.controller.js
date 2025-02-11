const connectDb = require('../config/database');
const Activity = require("../models/activity.model")

connectDb();

const activityController = {
  // Get comments for a specific task
  getComments: async (req, res) => {
    try {
      const comments = await Activity.find({
        task_id: req.params.taskId,
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
      const history = await Activity.find({
        task_id: req.params.taskId,
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
      const activities = await Activity.find({
        task_id: req.params.taskId
      }).sort({ createdAt: -1 });
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add a comment to a task
  addComment: async (req, res) => {
    try {
      const newActivity = new Activity({
        task_id: req.params.taskId,
        type: 'comment',
        content: req.body.content,
        user_id: req.user.id
      });

      const activity = await newActivity.save();
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = activityController;
