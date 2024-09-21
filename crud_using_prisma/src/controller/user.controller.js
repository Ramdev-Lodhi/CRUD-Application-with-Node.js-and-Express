const http = require("http");
const users = require("../userData");
const userModel = require('../model/user.model');


const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const user = await userModel.getUserById(userId);
    res.status(200).json(user);
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ error: 'User not this is controller found' });
    }
    res.status(500).json({ error: err.message });
  }
};

const insertUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userModel.insertUser(userData);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userData = req.body;
  try {
    const updatedUser = await userModel.updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const result = await userModel.deleteUser(userId);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
};