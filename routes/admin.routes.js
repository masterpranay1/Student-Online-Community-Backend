import express from 'express';
const router = express.Router()

import { loginAdmin, registerAdmin, createChannel, updateChannel, makeModerator, demoteToMember } from '../controller/admin.controller.js';
import { protectAdmin } from '../middleware/auth.middleware.js';

router.post('/register', 
  registerAdmin
)

router.post('/login',
  loginAdmin
)

router.post('/createChannel',
  protectAdmin,
  createChannel
)

router.post('/updateChannel',
  protectAdmin,
  updateChannel
)

router.put('/makeModerator',
  protectAdmin,
  makeModerator
)

router.put('/demoteToMember', 
  protectAdmin,
  demoteToMember
)

export default router;