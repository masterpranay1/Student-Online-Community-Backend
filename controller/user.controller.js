import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password)

  const user = await User.findOne({ email });

  const matchPassword = await user.matchPassword(password);
  if (user && matchPassword) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc   Get all users
// @route  GET /api/users
// @access Public

const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({ role: 'user' }).populate('channels');
  if(users) {
    res.status(200).json(users)
  } else {
    res.status(404);
    throw new Error('No users found');
  }
})

export {
  registerUser,
  loginUser,
  getAllUsers
}