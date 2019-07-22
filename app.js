'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors')
const rateLimit = require("express-rate-limit");
var session = require('express-session')
var login=require("./models/login")
var login = require('./routes/login');
var home=require("./routes/home")
var app = express();
var passport=require("passport")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 100// limit each IP to 100 requests per windowMs
  });


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true}))

app.use(session({ 
    secret: "nono",
    resave: false,
    saveUninitialized: false
}))
app.use(function (req, res, next) {
    var user={id:"",role:"",super1:"",super2:""}
    req.session.username = null;
    req.session.role="";
    req.session.login=user
    next();
  });
  require('./config/passport')(passport);
// catch 404 and forward to error handler
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// app.use(limiter);
app.use('/login', login);
app.use("/home", home);
app.use("/", home);


// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
 



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
  });
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});