const asynchandlr = require("express-async-handler");
// const userModel = require("../model/user.model");
const { userModel } = require("../model/index");
const ResponseMessage = require("../constant/responseMessage");
const HttpResponse = require("../util/httpResponse");
const HttpError = require("../util/httpError");
const session = require("../middleware/session");
const responseMessage = require("../constant/responseMessage");

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
  const { filename, path: filepath } = req.file;
  const newUser = await userModel.insertUser(userData, filename);
  HttpResponse(res, 201, ResponseMessage.USER_CREATED, newUser);
});

const updateUser = asynchandlr(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userData = req.body;
  const { filename, path: filepath } = req.file;
  const updatedUser = await userModel.updateUser(userId, userData, filename);
  HttpResponse(res, 200, ResponseMessage.USER_UPDATED, updatedUser);
});

const deleteUser = asynchandlr(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const result = await userModel.deleteUser(userId);
  HttpResponse(res, 204, ResponseMessage.USER_DELETED);
});

const imageUser = asynchandlr(async (req, res) => {
  if (req.file == undefined) {
    HttpError(res, 400, "No-file Selected");
  } else {
    const userId = parseInt(req.params.id, 10);
    const { filename, path: filepath } = req.file;
    const newUser = await userModel.imageUser(filename, userId);
    HttpResponse(res, 200, "File uploaded successfull", newUser);
  }
});

const logout = asynchandlr(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return HttpError(res, 500, responseMessage.LOGOUT_FAILED);
    }
    HttpResponse(res, 200, responseMessage.LOGOUT);
  });
});

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  logout,
  imageUser,
};
