const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const Otp = require('./Otp') // this gets the instance instead of the file (ie, {} gets file)
const Book = require('./Book')
const Reader = require('./Reader')

const User = sequelize.define(
	'User',
	{
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM,
			values: ["author", "reader"],
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country_code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone_number: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	},
	{
		modelName: 'users'
	}
)

User.hasMany(Otp, { foreignKey: 'userId' })
Otp.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Book, { foreignKey: 'userId' })
Book.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Reader, { foreignKey: 'userId' })
Reader.belongsTo(User, { foreignKey: 'userId' })

module.exports = User;
