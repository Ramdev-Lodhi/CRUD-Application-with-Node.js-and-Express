const ensureAuthenticated = (req, res, next) => {
    // console.log('Session:', req.session); // Debug logging
    // console.log('User:', req.session.passport.user);
    if (req.session || req.session.user) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized access, please login' });
  };
  
  module.exports = ensureAuthenticated;
  