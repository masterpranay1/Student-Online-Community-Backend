import express from 'express';
const router = express.Router()

import { loginAdmin, registerAdmin, createChannel } from '../controller/admin.controller.js';
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

export default router;