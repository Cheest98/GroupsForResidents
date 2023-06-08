import express from "express";
import { getFeedPosts, getUserPosts, getPostsByGroup} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/group/:groupId", getPostsByGroup);
export default router;