require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');
const activityRoutes = require('./routes/activity.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/task', taskRoutes);
app.use('/activity', activityRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});