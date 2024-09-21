const sessionExpress = require('express-session');

const session = sessionExpress({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false ,maxAge:60000}
});

module.exports =  session ;