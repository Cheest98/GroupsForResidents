import express from "express";
import { addUserToGroup, getAllGroups, getUserGroup } from '../controllers/group.js'
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.put('/:groupId/users', addUserToGroup);
router.get('/:userId/group', getUserGroup);
router.get("/", verifyToken, getAllGroups);

export default router;