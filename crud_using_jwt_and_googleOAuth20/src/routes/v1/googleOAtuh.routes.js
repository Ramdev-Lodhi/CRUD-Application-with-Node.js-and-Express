const express = require('express');
const passport = require('../../services/googleOAuth');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<a href="/v1/auth/google">Login with Google</a>');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const { token } = req.user; 
  res.json({ message: 'Login successful', token });
});


router.get('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;
