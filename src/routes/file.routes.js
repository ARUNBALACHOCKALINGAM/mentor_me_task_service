const express = require('express');
const  fileController  = require('../controllers/file.controller')

const router = express.Router();

// Upload single file to task
router.post('/file/:taskId', fileController.uploadFile, (req, res) => {
  res.status(201).json({ message: 'File uploaded successfully', file: req.file });
});

// Upload multiple files to task
router.post('/files/:taskId', fileController.uploadFiles, (req, res) => {
  res.status(201).json({ message: 'Files uploaded successfully', files: req.files });
});

// Get all files for a task
router.get('/files/:taskId', fileController.getFilesByTask);

// Download a file
router.get('/file/:fileId', fileController.downloadFile);

// Delete a file
router.delete('/file/:fileId', fileController.deleteFile);

module.exports = router;