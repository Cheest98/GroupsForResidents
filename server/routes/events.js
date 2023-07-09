import express from "express";
import { getGroupEvents, deleteEvent } from "../controllers/events.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/group/:groupId", verifyToken, getGroupEvents);
router.delete('/:eventId', deleteEvent); 

export default router;