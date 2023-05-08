import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controller/user.controller.js";

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


export default router;