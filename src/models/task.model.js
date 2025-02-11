const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['todo', 'inprogress', 'completed'],
    default: 'todo'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: false
  },
  resources: [{
    name: String,
    url: String
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  subTasks:{
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    default:[]
  },
  level: {
    type: Number,
    required: false
  },
  track: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', taskSchema);