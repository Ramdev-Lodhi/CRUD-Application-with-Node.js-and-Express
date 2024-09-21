const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(statusCode);
  res.status(statusCode);


  let message = err.message;


  if (err.code === 'P2002') {
    message = 'Email already exists';
  }

  res.json({
    message: message,
    stack:  err.stack 
  });
};

module.exports = { errorHandler };
