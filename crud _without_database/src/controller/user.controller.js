const express = require('express');
const asyncHandler = require('express-async-handler');
const users = require('../userData');

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = users.find(item => item.id == req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const index = users.findIndex(item => item.id === parseInt(req.params.id));
  if (index !== -1) {
    const updatedUser = {
      ...users[index],
      ...req.body
    };
    users[index] = updatedUser;
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const index = users.findIndex(item => item.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    res.status(200).json(deletedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const newIndex = users.length + 1;
  const newUser = {
    id: newIndex,
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser); // Changed status to 201 for resource creation
});

module.exports = {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  createUser
};
