const asynchandlr = require('express-async-handler');
const userModel = require('../model/user.model');
const { validationJoi } = require('../middleware/validation');
const { loginSchema, userSchema } = require('../validations/userSchemas');


const getUsers = asynchandlr(async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
});

const getUserById = asynchandlr(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await userModel.getUserById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

const insertUser = asynchandlr(async (req, res) => {
  const userData = req.body;
  const newUser = await userModel.insertUser(userData);
  res.status(201).json(newUser);
});

const updateUser = asynchandlr(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userData = req.body;
  const updatedUser = await userModel.updateUser(userId, userData);
  res.json(updatedUser);
});

const deleteUser = asynchandlr(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const result = await userModel.deleteUser(userId);
  res.json(result);
});


//using joi validation
const register = asynchandlr(async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const newUser = await userModel.registerUser(userData);
  res.status(201).json(newUser);
});

const login = asynchandlr(async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const userData ={email,password};
  const user = await userModel.loginUser(userData);

   // Store user data in session
   req.session.user = {
    id: user.userId,
    email: user.email,
    name: user.name,
    caste: user.caste,
    city: user.city,
    mobile: user.mobile
  };
  
console.log('session',req.session.user);
  res.status(200).json({ message: 'Login successful', ...user });
});


module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  register,
  login,
};
