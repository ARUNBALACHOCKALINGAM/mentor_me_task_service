const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

const fs = require("fs");
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

router.get("/user", authMiddleware, taskController.getTasks);
router.post("/", authMiddleware, taskController.getAllLevels);
router.post("/level", authMiddleware, taskController.getAllTasksByLevel);
router.post("/create", authMiddleware, upload.array('resources'), taskController.createTask);
router.get("/:taskId", authMiddleware, taskController.getTaskDetails);
router.patch("/status/:taskId", authMiddleware, taskController.updateStatus);
router.put("/update/:taskId", authMiddleware, upload.array('resources'), taskController.updateDetails);
router.delete("/:taskId/:parentTaskId", authMiddleware, taskController.deleteTask);


module.exports = router;
