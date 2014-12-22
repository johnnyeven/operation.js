var config = require('../config');
var Sequelize = require('sequelize'),
//sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
//	dialect: 'mysql',
//	host: config.database.host,
//	port: config.database.port
//});
sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
	dialect: 'sqlite',
	storage: config.database.storage
});

module.exports = sequelize;