var Sequelize = require('sequelize');
var sequelize = require('./DatabaseConnection');
var HostFactory = require('./Host');
var Host = HostFactory(sequelize, Sequelize);

exports.Host = Host;