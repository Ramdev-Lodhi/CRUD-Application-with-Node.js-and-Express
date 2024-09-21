const http = require("http");
const users = require("../userData");

const userModel = require('../model/user.model');


const getUsers = (req, res) => {
  userModel.getAllUsers((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(results);
  });
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  userModel.getUserById(userId, (err, result) => {
    if (err) {
      if (err.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(result);
  });
};

const insertUser = (req, res) => {
const userData = req.body;
 console.log('Received userData:', userData);
  userModel.insertUser(userData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(201).json(result);
  });
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  userModel.updateUser(userId, userData, (err, result) => {
    if (err) {
      if (err.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(result);
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  userModel.deleteUser(userId, (err, result) => {
    if (err) {
      if (err.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(result);
  });
};

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
};