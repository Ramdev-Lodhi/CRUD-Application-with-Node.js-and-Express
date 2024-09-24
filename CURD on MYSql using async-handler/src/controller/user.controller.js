const asynchandlr = require("express-async-handler");
const userModel = require("../model/user.model");
const ResponseMessage = require("../constant/responseMessage");
const HttpResponse = require("../util/httpResponse");
const HttpError = require("../util/httpError");

const getUsers = asynchandlr(async (req, res) => {
  const users = await userModel.getAllUsers();
  !users
    ? HttpError(res, 404, ResponseMessage.USER_NOT_FOUND)
    : HttpResponse(res, 200, ResponseMessage.USERS_FETCHED, users);
});

const getUserById = asynchandlr(async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  const user = await userModel.getUserById(userId);
  !user
    ? HttpError(res, 404, ResponseMessage.USER_NOT_FOUND)
    : HttpResponse(res, 200, ResponseMessage.USERS_FETCHED, user);
});

const insertUser = asynchandlr(async (req, res) => {
  const userData = req.body;
  const newUser = await userModel.insertUser(userData);
  HttpResponse(res, 201, ResponseMessage.USER_CREATED, newUser);
});

const updateUser = asynchandlr(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userData = req.body;
  const updatedUser = await userModel.updateUser(userId, userData);
  HttpResponse(res, 200, ResponseMessage.USER_UPDATED, updatedUser);
});

const deleteUser = asynchandlr(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const result = await userModel.deleteUser(userId);
  HttpResponse(res, 204, ResponseMessage.USER_DELETED);
});

const register = asynchandlr(async (req, res) => {
  const userData = req.body;
  const newUser = await userModel.registerUser(userData);
  console.log("UserData:", newUser);
  HttpResponse(res, 201, newUser.message, newUser.data);
});

const login = asynchandlr(async (req, res) => {
  const { email, password } = req.params;
  const user = await userModel.loginUser({ email, password });
  HttpResponse(res, 200, user.message, user.data);
});

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  register,
  login,
};
