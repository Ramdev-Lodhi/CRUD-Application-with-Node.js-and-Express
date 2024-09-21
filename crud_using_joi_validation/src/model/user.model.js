const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const asynchandlr = require('express-async-handler'); 

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  const userId = parseInt(id, 10);
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

const insertUser = async (userData) => {
  const { name, caste, city } = userData;
  return await prisma.user.create({
    data: { name, caste, city },
  });
};

const updateUser = async (id, userData) => {
  const { name, caste, city } = userData;
  return await prisma.user.update({
    where: { id },
    data: { name, caste, city },
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

const registerUser = async (userData) => {
    // console.log(userData);
  const { email, password } = userData;
  
  const user = await prisma.login.findUnique({
    where: { email: email },
  });

  if (user) {
    throw new Error('Email already exists');
  }

  return await prisma.login.create({
    data: { email, password },
  });
};
const loginUser = async (userData) => {
  const { email, password } = userData;
  const user = await prisma.login.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = (password === user.password); 

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return {
    message: 'Login successful',
    userId: user.id,
    email: user.email,
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
};
