// middleware/auth.js
const { verifyToken } = require('../utils/jwt');
const asynchandlr = require('express-async-handler');

const authenticate = asynchandlr(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token:', token); 

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const decoded = verifyToken(token); 
  req.user = decoded; 
  next(); 
});

module.exports = authenticate;
