const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true
    },
    track: {
        type: String,
        required: true,
        unique: true
    },
    isCompleted: {
        type: Boolean,  
        required: true,
        default: false
    },
    isUnlocked: {
        type: Boolean,  
        required: true,
        default: false
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task" // Reference to tasks in the Task model
        }
    ]
});

module.exports = mongoose.model("Level", LevelSchema); // ✅ FIXED: Corrected export
