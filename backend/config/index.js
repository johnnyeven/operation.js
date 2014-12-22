var app = require('../app');
var path = './' + app.get('env') + '/app'
var config = require(path);

module.exports = config;