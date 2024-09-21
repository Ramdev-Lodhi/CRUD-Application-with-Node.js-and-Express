// profile.route.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');


router.get('/', authMiddleware, (req, res) => {
  console.log('User from request:', req.user); 

  res.status(200).json({
    message: `Welcome, user ${req.user.name} ${req.user.caste}`, 
  });
});

module.exports = router;
