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
    enum: ['Todo', 'Inprogress', 'Completed'],
    default: 'Todo'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  points: {  
    type: Number,
    required: true
  },
  resources: [{
    name: String,
    url: String
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  subTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    default: []
  }],
  type: {
    type: String,
    enum: ["default", "mentor"],
    default: "default"
  },
  level:{
    type: String,
    ref: "Level"
  }
}, { timestamps: true }); // ✅ Enables createdAt & updatedAt automatically

module.exports = mongoose.model('Task', taskSchema);
