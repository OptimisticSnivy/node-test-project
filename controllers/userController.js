const bcrypt = require('bcrypt')
const { Op } = require('sequelize');
const User = require('../models/User');

const userController = {};

async function genHashedPass(password, saltRounds) {
	const salt = await bcrypt.genSalt(saltRounds)
	const passwordHash = await bcrypt.hash(password, salt)
	return passwordHash
}

userController.createUser = async (req, res) => {
	try {
		const body = req.body;

		const passwordHash = await genHashedPass(body.password, 10)

		const recordExists = await User.findOne({
			where: {
				[Op.or]: [
					{ username: body.username },
					{ email: body.email },
					{ phone_number: body.phone_number }
				]
			}
		})

		if (recordExists === null) {
			const user = await User.create({
				username: body.username,
				email: body.email,
				password: passwordHash,
				city: body.city,
				state: body.state,
				country: body.country,
				country_code: body.country_code,
				phone_number: body.phone_number
			});

			res.status(201).json({ success: true, data: user });
		} else {
			res.status(400).json({ success: false, error: 'Username/Email-ID/Phone-Number already Exists!' });
		}
	}
	catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
}

userController.getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();

		res.status(200).json({
			success: true,
			count: users.length,
			data: users
		});
	}
	catch (error) {
		res.status(500).json({
			success: true,
			error: error.message
		});
	}
}

userController.getUserById = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);

		if (!user) {
			return res.status(404).json({
				success: false,
				data: 'User not found!'
			});
		}

		res.status(200).json({
			success: true,
			data: user
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message
		});
	}
}

userController.getUserProfile = async (req, res) => {
	try {
		const user = await User.findOne({ where: { username: body.username } })

		if (!user) {
			return res.status(404).json({
				success: false,
				data: 'User not found!'
			});
		}

		const userProfile = {
			username: body.username,
			email: body.email,
			city: body.city,
			state: body.state,
			country: body.country,
			country_code: body.country_code,
			phone_number: body.phone_number
		}

		res.status(200).json({
			success: true,
			data: userProfile
		});

	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message
		});
	}
}

userController.updateUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({
				success: false,
				data: 'User not found!'
			});
		}
		const body = req.body;

		await user.update({
			username: body.username || user.name,
			city: body.city || user.city,
			state: body.state || user.state,
			country: body.country || user.country,
		})

		res.status(200).json({
			success: true,
			data: user
		});

	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message
		});
	}
}

userController.deleteUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({
				success: false,
				data: 'User not found!'
			});
		}

		await user.destroy();

		res.status(200).json({
			success: true,
			data: user
		});
	} catch (error) {
		res.status(200).json({
			success: false,
			error: error.message
		});
	}
}

module.exports = userController;
