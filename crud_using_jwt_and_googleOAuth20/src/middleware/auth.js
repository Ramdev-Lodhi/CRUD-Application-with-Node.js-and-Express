const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }
    req.user = decoded; // Attach decoded user to request
    next();
  });
};

module.exports = ensureAuthenticated;
