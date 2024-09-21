const express = require("express");
const userRoute = require("./user.route");
const profileRoute = require("./profile.route");
const authMiddleware = require('../../middleware/auth'); // Import the authentication middleware

const router = express.Router();

// Public and protected routes
const defaultRoutes = [
  {
    path: "/user",
    route: userRoute, // Public routes
  },
  {
    path: "/profile",
    route: profileRoute, // Protected routes
    isProtected: true, // This flag indicates if the route requires authentication
  },
];

// Apply routes and middleware
defaultRoutes.forEach((route) => {
  if (route.isProtected) {
    // Apply authentication middleware to protected routes
    router.use(route.path, authMiddleware, route.route);
  } else {
    // Apply public routes directly
    router.use(route.path, route.route);
  }
});

module.exports = router;
