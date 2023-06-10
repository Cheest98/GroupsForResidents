import express from "express";
import { createGroup, addUserToGroup, getAllGroups, getUserGroup } from '../controllers/group.js'
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/creategroup', createGroup);
router.put('/:groupId/users', addUserToGroup);
router.get("/", verifyToken, getAllGroups);
router.get("/users/:id/group", verifyToken, getUserGroup);

export default router;