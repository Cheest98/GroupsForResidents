import express from "express";
import { getGroupEvents, deleteEvent,updateEvent } from "../controllers/events.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/group/:groupId", verifyToken, getGroupEvents);
router.delete('/:eventId', deleteEvent); 
router.put("/:eventId", verifyToken, updateEvent);

export default router;