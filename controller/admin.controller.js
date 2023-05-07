import expressAsyncHandler from "express-async-handler";
import Admin from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// desc Register a new admin
// @route POST /api/admin/register
// @access Public

const registerAdmin = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const adminExist = await Admin.findOne({ email });

  if (adminExist) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const admin = await Admin.create({ name, email, password, role: 'admin' });

  if (admin) {
    generateToken(res, admin._id);

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
})

// @desc Login the admin
// @route POST /api/admin/login
// @access Public

const loginAdmin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  const matchPassword = await admin.matchPassword(password);
  if (admin && matchPassword && admin.role == 'admin') {
    generateToken(res, admin._id);

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
})

export {
  loginAdmin,
  registerAdmin
}