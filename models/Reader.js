const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Reader = sequelize.define(
	'Reader',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		bookBorrowed: {
			type: DataTypes.STRING,
			allowNull: false
		},
		issuedAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		isReturned: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
)

module.exports = Reader;
