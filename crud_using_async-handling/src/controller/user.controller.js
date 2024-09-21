const asynchandlr = require('express-async-handler'); 
const userModel = require('../model/user.model'); 

const getUsers = asynchandlr(async (req, res) => {
    const users = await userModel.getAllUsers();
    res.json(users);
});

const getUserById = asynchandlr(async (req, res,next) => {
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

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
};
