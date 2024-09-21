// Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications
require('dotenv').config(); 
const express = require("express");
const { errorHandler } = require('./middleware/errorhandling');
const session = require('./middleware/session');
const bodyParser = require("body-parser");
const routes = require("./routes/v1");
const passport = require('./services/googleOAuth');

const app = express(); 
const port = process.env.PORT;

app.use(session);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/v1', routes);
app.use(errorHandler);


app.listen(port, (error) => {
  if (!error)
    console.log(
  "Server is Successfully Running, and App is listening on port " + port
);
else console.log("Error occurred, server can't start", error);
});