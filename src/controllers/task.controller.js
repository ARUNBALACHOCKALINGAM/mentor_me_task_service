const connectDb = require('../config/database');
const Task = require('../models/task.model');
const Level = require('../models/level.model');
const Activity = require('../models/activity.model');
const fetchUserDetails = require('../utils/user');

connectDb();

const taskController = {
  // Get all tasks for a user
  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find({ userId: req.user.id }).populate('subTasks');
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get tasks for a track grouped by level
  getAllLevels: async (req, res) => {
    try {
      const { track } = req.body;

      if (!track) {
        return res.status(400).json({ message: "Track is required" });
      }

      // Fetch tasks filtered by track
      const tasks = await Level.find({ track }).populate("tasks");

      // Group tasks by level
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Get tasks for a track grouped by level
  getAllTasksByLevel: async (req, res) => {
    try {
      const { level, track } = req.body;

      if (!level && !track) {
        return res.status(400).json({ message: "Level and track is required" });
      }

      // Fetch tasks filtered by track
      const levelDetails = await Level.findOne({ level, track }).populate("tasks");



      // Group tasks by level
      res.json(levelDetails.tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new task
  createTask: async (req, res) => {
    try {
    
      const { name, description, difficulty, resources, level, track, type, subTasks, points, parentTaskId } = req.body;
      

      const newTask = new Task({
        name,
        description,
        difficulty,
        resources,
        userId: req.user.id,
        level,
        track,
        type,
        subTasks,
        points
      });

      const task = await newTask.save();

    

      if (parentTaskId) {
        const parentTask = await Task.findById(parentTaskId);
        console.log(parentTask)
        if (!parentTask) {
          return res.status(404).json({ message: 'Task not found' });
        }
        parentTask.subTasks.push(task)

        const updatedTask = await parentTask.save()
      }

      const user = await fetchUserDetails(req.user.id);

      // Create activity record
      await Activity.create({
        taskId: task._id,
        type: 'history',
        content: 'Task created',
        userId: req.user.id,
        username: user.username
      });

      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },



  // Update task status
  updateStatus: async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId);
  
      const { status } = req.body;
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      const oldStatus = task.status; // Store the old status
      task.status = status; // Update the status
  
      const updatedTask = await task.save();
  
      // Fetch user details
      const user = await fetchUserDetails(req.user.id);
  
      if (!user || !user.username) {
        return res.status(404).json({ message: 'User details not found' });
      }
  
      // Create activity record
      await Activity.create({
        taskId: task._id,
        type: 'history',
        content: `Status changed from ${oldStatus} to ${status}`,
        userId: req.user.id,
        username: user.username 
      });
  
      res.json(updatedTask);
    } catch (error) {
      console.error('Error in updateStatus:', error);
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

      ['name', 'description', 'difficulty', 'resources', 'points', 'type'].forEach(field => {
        if (req.body[field] !== undefined) {
          task[field] = req.body[field];
        }
      });

      const updatedTask = await task.save();

      const user = await fetchUserDetails(req.user.id);
      console.log(user)

      // Create activity record
      await Activity.create({
        taskId: task._id,
        type: 'history',
        content: 'Task details updated',
        userId: req.user.id,
        username: user.username
      });

      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // Get task details by ID
  getTaskDetails: async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId).populate('subTasks'); // Populate subTasks if needed

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Optionally check if the user has permission to view the task
      // if (task.userId.toString() !== req.user.id) {
      //   return res.status(403).json({ message: 'Unauthorized' });
      // }

      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Delete a task
  deleteTask: async (req, res) => {
    try {
      const { taskId, parentTaskId } = req.params;
  
      // Find the task
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // If the task has subtasks, delete them
      if (task.subTasks && task.subTasks.length > 0) {
        await Task.deleteMany({ _id: { $in: task.subTasks } });
      }
  
      // If parentTaskId is provided, update the parent task's subtasks array
      if (parentTaskId) {
        const parentTask = await Task.findById(parentTaskId);
  
        if (!parentTask) {
          return res.status(404).json({ message: 'Parent task not found' });
        }
  
        // Remove the deleted task from the parent's subtasks array
        parentTask.subTasks = parentTask.subTasks.filter(
          (subTask) => subTask.toString() !== taskId
        );
  
        await parentTask.save();
      }
  
      // Delete the task
      await Task.findByIdAndDelete(taskId);
  
      // Delete associated activities
      await Activity.deleteMany({ taskId });
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error in deleteTask:', error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = taskController;
