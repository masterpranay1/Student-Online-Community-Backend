import express from 'express';
const router = express.Router()

import { loginAdmin, registerAdmin } from '../controller/admin.controller.js';
import { protectAdmin } from '../middleware/auth.middleware.js';

router.post('/register', 
  registerAdmin
)

router.post('/login',
  loginAdmin
)

router.post('/createChannel',
  protectAdmin,
  (req, res) => {
    res.send('create channel')
  }
)

export default router;