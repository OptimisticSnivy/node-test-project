const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Otp = sequelize.define(
	'Otp',
	{
		code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		expiresAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		isVerified: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
)

module.exports = Otp;
