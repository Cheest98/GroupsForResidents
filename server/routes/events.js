import express from "express";
import { getGroupEvents, } from "../controllers/events.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:groupId", verifyToken, getGroupEvents);


export default router;