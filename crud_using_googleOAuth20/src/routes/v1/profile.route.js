const express = require('express');
const ensureAuthenticated = require('../../middleware/auth');
const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
  const user = req.session.passport.user; 
  console.log('User:', user);
  if (user) {
    res.status(200).json({
      message: `Welcome, user ${user.displayName}`, 
      profileData: user,
    });
  } else {
    res.status(401).json({ message: 'Unauthorized access, please login' });
  }
});

module.exports = router;
