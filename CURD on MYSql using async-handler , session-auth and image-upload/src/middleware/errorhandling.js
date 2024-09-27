const { INTERNAL_ERROR } = require("../constant/responseMessage");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message || INTERNAL_ERROR,
    stack: err.stack,
  });
};

module.exports = { errorHandler };
