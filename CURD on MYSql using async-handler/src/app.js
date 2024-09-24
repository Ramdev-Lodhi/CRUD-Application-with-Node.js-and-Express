// Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications
const express = require("express");
const { errorHandler } = require("./middleware/errorhandling");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const bodyParser = require("body-parser");
const routes = require("./routes/v1");
const app = express(); // Intialise the express
const port = 3000;

app.use(bodyParser.json());

app.listen(port, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + port
    );
  else console.log("Error occurred, server can't start", error);
});
// v1 api routes
app.use("/v1", routes);
app.use(globalErrorHandler);
app.use(errorHandler);
