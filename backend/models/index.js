var Sequelize = require('sequelize');
var sequelize = require('./DatabaseConnection');
var HostFactory = require('./Host');
var KeyFactory = require('./Key');
var CategoryFactory = require('./Category');
var Host = HostFactory(sequelize, Sequelize);
var Key = KeyFactory(sequelize, Sequelize);
var Category = CategoryFactory(sequelize, Sequelize);

exports.Host = Host;
exports.Key = Key;
exports.Category = Category;