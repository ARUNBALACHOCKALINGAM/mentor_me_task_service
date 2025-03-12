const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: String,
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  metadata: {
    taskId: mongoose.Schema.Types.ObjectId,
    mimetype: String,
    size: Number
  }
});

module.exports = mongoose.model('File', FileSchema, 'uploads.files');