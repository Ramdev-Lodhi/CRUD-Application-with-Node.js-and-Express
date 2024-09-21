// profile.route.js
const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
  const user = req.session.user;
  console.log('User from request:', user); 

  res.status(200).json({
    message: `Welcome, user ${user.name} ${user.caste}`, 
    profileData: user, 
  });
});

module.exports = router;
