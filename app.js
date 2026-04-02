// const { sequelize } = require('../config/database')
const { connectDB } = require('./config/database')

const startApp = async () => {
	await connectDB();
	console.log('app running & connected!')
}

startApp();
