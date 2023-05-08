import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      if(req.user.role !== 'admin') {
        throw new Error('Not authorized as an admin');
      }

      next();
    } catch (error) {
      console.error(error);
      if(error.message == 'Not authorized as an admin') {
        res.status(401);
        throw new Error('Not authorized as an admin');
      } else {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const protectUser = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protectAdmin, protectUser };
