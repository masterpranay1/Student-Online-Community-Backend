import express from "express";
import { registerUser, loginUser, getAllUsers, getUserById, isUserInChannel } from "../controller/user.controller.js";
import { protectUser } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post('/register', 
  registerUser
);

router.post('/login', 
  loginUser
);

router.get('/getAllUsers',
  getAllUsers
)

router.get('/getUserById/:userId', 
  protectUser,
  getUserById
)

router.get('/isUserInChannel/:channelId',
  protectUser,
  isUserInChannel
)


export default router;