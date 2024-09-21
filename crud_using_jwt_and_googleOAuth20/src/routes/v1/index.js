const express = require("express");
const userRoute = require("./user.route");
const profileRoute = require("./profile.route");
const authRoute = require("./googleOAtuh.routes");


const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute, 
  },
  {
    path: "/auth",
    route: authRoute,  
  },
  {
    path: "/profile",
    route: profileRoute, 
    isProtected: true, 
  },
];


defaultRoutes.forEach((route) => {
  if (route.isProtected) {

    router.use(route.path, route.route);
  } else {
  
    router.use(route.path, route.route);
  }
});

module.exports = router;
