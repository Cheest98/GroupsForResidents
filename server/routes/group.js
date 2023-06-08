import express from "express";
import { createGroup, addUserToGroup, getAllGroups} from '../controllers/group.js'
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/creategroup', createGroup);
router.put('/:groupId/users', addUserToGroup);
router.get("/", verifyToken, getAllGroups);

export default router;