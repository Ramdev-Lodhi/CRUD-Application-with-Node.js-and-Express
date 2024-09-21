// Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications
require('dotenv').config(); 
const express = require("express");
const { errorHandler } = require('./middleware/errorhandling');
const session = require('./middleware/session');
const bodyParser = require("body-parser");
const routes = require("./routes/v1");
const passport = require('./services/googleOAuth');
// const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express(); // Intialise the express
const port = process.env.PORT;

app.use(session);
app.use(bodyParser.json());


app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth routes
app.get('/google', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});


app.use('/profile', require('./routes/v1/profile.route'));

app.use('/v1', routes);

app.use(errorHandler);


app.listen(port, (error) => {
  if (!error)
    console.log(
  "Server is Successfully Running, and App is listening on port " + port
);
else console.log("Error occurred, server can't start", error);
});

// v1 api routes
// app.use("/v1", routes);
