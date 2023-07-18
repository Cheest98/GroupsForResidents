import express from "express";
import { getFeedTasks, deleteTask, updateTaskStatus } from "../controllers/tasks.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/group/:groupId", verifyToken, getFeedTasks);

/* UPDATE */
router.patch("/:taskId/status", verifyToken, updateTaskStatus); 
/* DELETE */
router.delete("/:taskId", verifyToken, deleteTask); 

export default router;
