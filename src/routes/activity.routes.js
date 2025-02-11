const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');

// Get comments for a specific task
router.get('/comments/:taskId', activityController.getComments);

// Get history for a specific task
router.get('/history/:taskId', activityController.getHistory);

// Get all activities for a specific task
router.get('/:taskId', activityController.getActivities);

// Add a comment to a task
router.post('/comments/:taskId', activityController.addComment);

module.exports = router;