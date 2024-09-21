// utils/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET); 
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
