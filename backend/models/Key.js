module.exports = function(sequelize, DataType) {
	var Key = sequelize.define('Key', {
		id: DataType.INTEGER,
		name: DataType.STRING,
		key: {
			type: DataType.STRING,
			defaultValue: ''
		},
		password: {
			type: DataType.STRING,
			defaultValue: ''
		}
	}, {
		tableName: 'keys',
		timestamps: false
	});

	return Key;
};