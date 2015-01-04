exports.add = function(req, res, next) {
    req.assert('name', 'Invalid name').notEmpty();
    req.assert('key', 'Invalid key').notEmpty();
    req.assert('password', 'Invalid password').optional().len(6, 16);
};