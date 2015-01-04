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
        req.assert('key', 'Invalid key').notEmpty().isInt();
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

exports.delete = function(req, res, next) {
    req.assert('id', 'Invalid ID').notEmpty();
    var errors = req.validationErrors(true);
    if(errors) {
        var err = {
            status: 400,
            message: errors
        };
        return next(err, req, res);
    }

    var param = req.param('id');
    var ids = param.split(',');
    if(ids.length > 0) {
        var _ = require('underscore');
        if(_.every(ids, function(item, index, ids) {
            return !isNaN(item);
        })) {
            var Host = require('../proxy').Host;
            Host.delete({
                id: ids
            }, {}, function(affectedRows) {
                res.json({
                    affected_rows: affectedRows
                });
            });
        } else {
            var err = {
                status: 400,
                message: 'Invalid ids'
            };
            return next(err, req, res);
        }
    }
};

exports.read = function(req, res, next) {
    req.assert('page', 'Invalid page').optional().isInt();
    req.assert('limit', 'Invalid limit').optional().isInt();
    var errors = req.validationErrors(true);
    if(errors) {
        var err = {
            status: 400,
            message: errors
        };
        return next(err, req, res);
    }

    var page = parseInt(req.param('page')),
        limit = parseInt(req.param('limit'));
    if(!page) page = 1;
    if(!limit) limit = 10;
    if(limit > 500) limit = 500;
    var offset = (page - 1) * limit;

    var Host = require('../proxy').Host;
    Host.read({}, {
        limit: limit,
        offset: offset
    }, function(err, results) {
        if(err) {
            return next(err, req, res);
        }
        if(results && results.length > 0) {
            res.json(results);
        } else {
            res.json([]);
        }
    });
};