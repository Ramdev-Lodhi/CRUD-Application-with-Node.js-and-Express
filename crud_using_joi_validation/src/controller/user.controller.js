const asynchandlr = require('express-async-handler'); 
const userModel = require('../model/user.model'); 
const {loginSchema, userSchema } = require('../middleware/validation');

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
  const { error, value } = userSchema.validate(userData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newUser = await userModel.insertUser(userData);
  res.status(201).json(newUser);
});

const updateUser = asynchandlr(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userData = req.body;
  const { error, value } = userSchema.validate(userData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
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
  const { error, value } = await loginSchema.validate(userData);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const newUser = await userModel.registerUser(value);
  res.status(201).json(newUser);
});
const login = asynchandlr(async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const userData ={email,password};
  const { error, value } = await loginSchema.validate(userData);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const newUser = await userModel.loginUser(value);
  res.status(201).json(newUser);
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
