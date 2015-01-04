module.exports = function(sequelize, DataType) {
	var Category = sequelize.define('Category', {
		id: DataType.INTEGER,
		name: DataType.STRING
	}, {
		tableName: 'category',
		timestamps: false
	});

	return Category;
};