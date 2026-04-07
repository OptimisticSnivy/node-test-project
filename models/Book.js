const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Book = sequelize.define(
	'Book',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false
		},
		qty: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
)

module.exports = Book;
