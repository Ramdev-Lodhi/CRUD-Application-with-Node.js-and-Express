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
    console.log(userData);
  const { name, caste, city, email,mobile_no, password  } = userData;
  
  const user = await prisma.login.findUnique({
    where: { email: email },
  });

  if (user) {
    throw new Error('Email already exists');
  }
   await prisma.user.create({
    data: {  name, caste, city, email,mobile_no, password },
  });
  return await prisma.login.create({
    data: { email, password },
  });
};


const loginUser = async (userData) => {
  const { email, password } = userData;
  
  const userWithLogin = await prisma.login.findUnique({
    where: { email },
    include: { user: true },
  });

  if (!userWithLogin || password !== userWithLogin.password) {
    throw new Error('Invalid email or password');
  }

  const { id, user } = userWithLogin;
  return {
    message: 'Login successful',
    userId: id,
    email,
    userName: user?.name,
    caste: user?.caste,
    city: user?.city,
    mobile: user?.mobile_no,
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
