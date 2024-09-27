const asynchandlr = require("express-async-handler");
const loginM = require("../model/login.model");

const ResponseMessage = require("../constant/responseMessage");
const HttpResponse = require("../util/httpResponse");
const HttpError = require("../util/httpError");
const session = require("../middleware/session");
const responseMessage = require("../constant/responseMessage");
const register = asynchandlr(async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const newUser = await loginM.registerUser(userData);
  console.log("UserData:", newUser);
  HttpResponse(res, 201, newUser.message, newUser.data);
});

const login = asynchandlr(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginM.loginUser({ email, password });
  // Store user data in session
  req.session.user = user.data;
  HttpResponse(res, 200, user.message, user.data);
});

module.exports = {
  register,
  login,
};
