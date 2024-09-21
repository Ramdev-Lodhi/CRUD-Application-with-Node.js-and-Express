const express = require('express');
const ensureAuthenticated = require('../../middleware/auth');
const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
  res.status(200).json({
    message: `Welcome, ${req.user.email}`, // Use req.user from the token
  });
});

module.exports = router;
