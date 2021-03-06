var express = require('express');
var path = require('path');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var session = require('express-session');
var log4js = require('log4js');

var app = express();

// enviroment
// app.set('env', 'production');
app.set('env', 'development');

module.exports = app;
var config = require('./config');

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 512000000,
            backups:0,
            category: 'access'
        },
        {
            type: 'file',
            filename: 'logs/debug.log',
            maxLogSize: 512000000,
            backups:0,
            category: 'debug'
        }
    ]
});
var logger = log4js.getLogger('access');
app.use(log4js.connectLogger(logger, {
    level: log4js.levels.INFO
}));

app.use(compression({
    threshold: 512
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root      = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
app.use(cookieParser());
app.use(session({
    secret: config.cookieSecret,
    //store: new MongoStore({
    //    url: "mongodb://" + config.game_db.ip + "/" + config.game_db.database + "/sessions"
    //}),
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json(err)
    });
} else {
// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json(err)
    });
}

require('./models');
