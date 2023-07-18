import express from "express";
import { getPosts } from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/group/:groupId", getPosts);

export default router;
