const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware"); // Import middleware

router.get("/user", authMiddleware, taskController.getTasks);
router.post("/",authMiddleware,taskController.getAllLevels);
router.post("/level",authMiddleware,taskController.getAllTasksByLevel);
router.post("/create", authMiddleware, taskController.createTask);
router.get("/:taskId", authMiddleware, taskController.getTaskDetails);
router.patch("/status/:taskId", authMiddleware, taskController.updateStatus);
router.put("/update/:taskId", authMiddleware, taskController.updateDetails);
router.delete("/:taskId/:parentTaskId",authMiddleware,taskController.deleteTask);

module.exports = router;
