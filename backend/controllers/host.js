exports.add = function(req, res, next) {
    req.assert('name', 'Invalid name').notEmpty();
    req.assert('host', 'Invalid host').notEmpty();
    req.assert('port', 'Invalid port').optional();
    req.assert('login_type', 'Invalid login_type').notEmpty().isInt();
    req.assert('username', 'Invalid username').notEmpty();
    var errors = req.validationErrors(true);
    if(errors) {
        var err = {
            status: 400,
            message: errors
        };
        return next(err, req, res);
    }
    var name = req.param('name'),
        host = req.param('host'),
        port = parseInt(req.param('port')),
        login_type = parseInt(req.param('login_type')),
        username = req.param('username');
    if(login_type == 0) {   //用户名密码
        req.assert('password', 'Invalid password').notEmpty();
    } else {                //密钥
        req.assert('key', 'Invalid key').notEmpty();
    }
    errors = req.validationErrors(true);
    if(errors) {
        var err = {
            status: 400,
            message: errors
        };
        return next(err, req, res);
    }
    var password = req.param('password'),
        key = req.param('key');

    var Host = require('../proxy').Host;
    var params = {
        name: name,
        host: host,
        login_type: login_type,
        username: username
    };
    if(login_type == 0) {
        var crypto = require('crypto');
        var md5 = crypto.createHash('md5');
        params.password = md5.update(password).digest('hex');
    } else {
        params.key = key;
    }
    if(port) {
        params.port = port;
    }
    Host.save(params, function(err) {
        if(err) {
            return next(err, req, res);
        }
        res.json({
            status: 200,
            code: 0
        });
    });
};

exports.read = function(req, res, next) {

};