const sessionExpress = require('express-session');

const session = sessionExpress({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false ,maxAge:6000}
});

module.exports =  session ;