import express from "express";
import { createGroup, addUserToGroup } from '../controllers/group.js'

const router = express.Router();

router.post('/creategroup', createGroup);
router.put('/:groupId/users', addUserToGroup);

export default router;