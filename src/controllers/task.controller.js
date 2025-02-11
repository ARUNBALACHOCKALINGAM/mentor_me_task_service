const connectDb = require('../config/database');
const Task = require('../models/task.model');
const Activity = require('../models/activity.model'); // Import the Activity model

connectDb();

const taskController = {
  // Get all tasks for a user
  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find({ user_id: req.user.id });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new task
  createTask: async (req, res) => {
    try {
      const newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        difficulty: req.body.difficulty,
        resources: req.body.resources,
        user_id: req.user.id,
        level:req.body.level,
        track:req.body.track
      });

      const task = await newTask.save();

      // Create activity record for task creation
      const newActivity = new Activity({
        task_id: task._id,
        type: 'history',
        content: 'Task created',
        user_id: req.user.id
      });

      await newActivity.save();

      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update task status
  updateStatus: async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      if (task.user_id.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      const oldStatus = task.status;
      task.status = req.body.status;
      task.updated_at = new Date();

      const updatedTask = await task.save();

      // Create activity record for status change
      // const newActivity = new Activity({
      //   task_id: task._id,
      //   type: 'history',
      //   content: `Status changed from ${oldStatus} to ${req.body.status}`,
      //   user_id: req.user.id
      // });

      // await newActivity.save();

      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update task details
  updateDetails: async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

       if (task.user_id.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      ['name', 'description', 'difficulty', 'resources'].forEach(field => {
        if (req.body[field]) {
          task[field] = req.body[field];
        }
      });
      task.updated_at = new Date();

      const updatedTask = await task.save();

      // Create activity record for task update
      const newActivity = new Activity({
        task_id: task._id,
        type: 'history',
        content: 'Task details updated',
        user_id: req.user.id
      });

      await newActivity.save();

      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = taskController;
