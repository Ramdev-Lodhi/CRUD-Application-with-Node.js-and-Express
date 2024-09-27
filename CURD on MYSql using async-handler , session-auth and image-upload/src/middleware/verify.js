const responseMessage = require("../constant/responseMessage");
const httpError = require("../util/httpError");
const session = require("./session");

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    httpError(res, 401, responseMessage.USER_NOT_ATHURIZED);
  }
};
