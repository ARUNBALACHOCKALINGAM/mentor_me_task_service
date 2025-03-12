// task.model.js
const mongoose = require('mongoose');
const File = require('./file.model'); // Import the File model

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Todo', 'Inprogress', 'Completed'], default: 'Todo' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  points: { type: Number, required: true },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }], // Reference to the File model
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] }],
  type: { type: String, enum: ["default", "mentor"], default: "default" },
  level: { type: mongoose.Schema.Types.ObjectId, ref: "Level" }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);