const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get comments for a specific task
router.get('/comments/:taskId', authMiddleware,activityController.getComments);

// Get history for a specific task
router.get('/history/:taskId', authMiddleware,activityController.getHistory);

// Get all activities for a specific task
router.get('/:taskId', authMiddleware,activityController.getActivities);

// Add a comment to a task
router.post('/comments/:taskId',authMiddleware, activityController.addComment);

module.exports = router;