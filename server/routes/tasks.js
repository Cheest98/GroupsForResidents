import express from "express";
import { getFeedTasks, getUserTasks, deleteTask, updateTaskStatus } from "../controllers/tasks.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedTasks);
router.get("/:userId/tasks", verifyToken, getUserTasks);

/* UPDATE */
router.patch("/:taskId/status", verifyToken, updateTaskStatus); 
/* DELETE */
router.delete("/:taskId", verifyToken, deleteTask); 

export default router;
