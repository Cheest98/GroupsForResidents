import express from "express";
import { getFeedTasks, getUserTasks } from "../controllers/tasks.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedTasks);
router.get("/:userId/tasks", verifyToken, getUserTasks);

/* UPDATE */

export default router;