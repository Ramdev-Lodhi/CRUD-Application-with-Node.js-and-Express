const express = require("express");
const userRoute = require("./user.route");
const loginRoute = require("./login.route");
const router = express.Router();
const defaultRoutes = [
  {
    path: "/",
    route: loginRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
