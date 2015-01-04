module.exports = function(sequelize, DataType) {
	var Host = sequelize.define('Host', {
		id: DataType.INTEGER,
		name: DataType.STRING,
		host: DataType.STRING,
		port: {
			type: DataType.INTEGER,
			allowNull: false,
			defaultValue: 22
		},
		login_type: DataType.INTEGER,
		username: DataType.STRING,
		password: {
			type: DataType.STRING,
			defaultValue: ''
		},
		key: {
			type: DataType.INTEGER,
			defaultValue: 0
		}
	}, {
		tableName: 'hosts',
		timestamps: false
	});

	return Host;
};