const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Get all tasks
router.get('/', taskController.getTasks);

// Create new task
router.post('/', taskController.createTask);

// Update task status
router.patch('/status/:taskId', taskController.updateStatus);

// Update task details
router.put('/update/:taskId', taskController.updateDetails);

module.exports = router;