require("dotenv").config();
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");
const activityRoutes = require("./routes/activity.routes");
const fileRoutes = require("./routes/file.routes");
const cookieParser = require("cookie-parser");
const path = require('path')
const app = express();

// ✅ Configure CORS properly
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // ✅ Allow cookies & authentication headers
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/tasks", taskRoutes);
app.use("/activity", activityRoutes);
app.use("/files", fileRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
