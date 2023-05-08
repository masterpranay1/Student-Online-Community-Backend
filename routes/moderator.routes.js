import express from 'express';
const router = express.Router()

import { protectModerator } from '../middleware/auth.middleware.js';
import { createGroup, updateGroup } from '../controller/group.controller.js';

router.post('/createGroup', 
  protectModerator,
  createGroup
)

router.put('/updateGroup', 
  protectModerator,
  updateGroup
)

export default router;