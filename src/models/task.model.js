const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Todo', 'Inprogress', 'Completed'], default: 'Todo' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  points: { type: Number, required: true },
  resources: [{
    name: { type: String, required: true },
    data: { type: Buffer, required: true }, // Binary file data
    size: { type: Number, required: true },
    type: { type: String, required: true } // File type (MIME)
  }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] }],
  type: { type: String, enum: ["default", "mentor"], default: "default" },
  level: { type: mongoose.Schema.Types.ObjectId, ref: "Level" } // Level should be ObjectId
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
