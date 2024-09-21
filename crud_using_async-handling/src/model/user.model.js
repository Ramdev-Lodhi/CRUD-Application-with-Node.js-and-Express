const asynchandlr = require('express-async-handler'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = asynchandlr(async (id) => {
  const userId = parseInt(id, 10);
  return await prisma.user.findUnique({
    where: { id: userId },
  });
});

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

module.exports = {
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
};
