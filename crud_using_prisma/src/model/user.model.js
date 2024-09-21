const db = require('../config/database'); 

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (err) {
    throw new Error('Database query error');
  }
};

const getUserById = async (id) => {
  // const userID=id;
  const userId = parseInt(id, 10);
  try {
    console.log(userId);

    const user = await prisma.user.findUnique({ 
      where: { 
        id:userId 
      }
     });
    if (!user) throw new Error('User not found');
    return user;
  } catch (err) {
    throw err;
  }
};

const insertUser = async (userData) => {
  try {
    const { name, caste, city } = userData;
    return await prisma.user.create({
      data: { name, caste, city }
    });
  } catch (err) {
    throw new Error('Database query error');
  }
};

const updateUser = async (id, userData) => {
  try {
    const { name, caste, city } = userData;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, caste, city }
    });
    return updatedUser;
  } catch (err) {
    if (err.code === 'P2025') { 
      throw new Error('User not found');
    }
    throw new Error('Database query error');
  }
};

const deleteUser = async (id) => {
  try {
    await prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  } catch (err) {
    if (err.code === 'P2025') { 
      throw new Error('User not found');
    }
    throw new Error('Database query error');
  }
};
  module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
  };
