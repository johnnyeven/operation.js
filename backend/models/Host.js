module.exports = function(sequelize, DataType) {
	var Host = sequelize.define('Host', {
		id: DataType.INTEGER,
		name: DataType.STRING,
		host: DataType.STRING,
		port: DataType.INTEGER,
		login_type: DataType.INTEGER,
		username: DataType.STRING,
		password: DataType.STRING,
		key: DataType.STRING
	}, {
		tableName: 'hosts',
		timestamps: false
	});

	return Host;
};