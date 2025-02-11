const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Example: "Frontend", "Backend", "Data Science"
    },
    levels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Level" // Reference to Level model
        }
    ]
});

module.exports = mongoose.model("Track", TrackSchema);
