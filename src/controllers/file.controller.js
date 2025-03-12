const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const dotenv = require('dotenv');
const File = require('../models/file.model');

dotenv.config();

// GridFS Configuration
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: 'uploads',
        metadata: {
          taskId: new mongoose.Types.ObjectId(req.params.taskId),
          mimetype: file.mimetype,
          size: file.size
        }
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

// Controller Methods
const fileController = {
  // Upload single file to a task
  uploadFile: upload.single('file'),

  // Upload multiple files to a task
  uploadFiles: upload.array('files'),

  // Get all files for a task
  getFilesByTask: async (req, res) => {
    try {
      const files = await File.find({ 'metadata.taskId': req.params.taskId });
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching files', error });
    }
  },

  // Download a file
  downloadFile: async (req, res) => {
    try {
      const file = await File.findOne({ _id: req.params.fileId });
      if (!file) return res.status(404).json({ message: 'File not found' });

      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
      });

      const downloadStream = bucket.openDownloadStream(file._id);
      downloadStream.pipe(res);
    } catch (error) {
      res.status(500).json({ message: 'Error downloading file', error });
    }
  },

  // Delete a file
  deleteFile: async (req, res) => {
    try {
      const file = await File.findOne({ _id: req.params.fileId });
      if (!file) return res.status(404).json({ message: 'File not found' });

      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
      });

      await bucket.delete(file._id);
      res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting file', error });
    }
  }
};

module.exports = fileController;
