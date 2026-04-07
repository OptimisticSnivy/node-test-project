const { Op } = require('sequelize');
const User = require('../models/User');
const genHashedPass = require('../utils')

const userController = {
	createUser: async (req, res) => {
		try {
			const body = req.body;

			const recordExists = await User.findOne({
				where: {
					[Op.or]: [
						{ username: body.username },
						{ email: body.email },
						{ phone_number: body.phone_number }
					]
				}
			})

			if (!recordExists) {
				const passwordHash = await genHashedPass(body.password, 10)
				const user = await User.create({
					username: body.username,
					email: body.email,
					password: passwordHash,
					role: body.role,
					city: body.city,
					state: body.state,
					country: body.country,
					country_code: body.country_code,
					phone_number: body.phone_number
				});

				return res.status(201).json({ success: true, data: user });
			}

			res.status(400).json({ success: false, error: 'Username/Email-ID/Phone-Number already Exists!' });
		}
		catch (error) {
			res.status(500).json({ success: false, error: error.message });
		}
	},

	getAllUsers: async (req, res) => {
		try {
			const users = await User.findAll({
				attributes: ['username', 'city', 'state', 'country', 'country_code'],
			});

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
	},

	getUserById: async (req, res) => {
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
	},

	getUserProfile: async (req, res) => {
		try {
			const userProfile = await User.findOne({
				attributes: ['email', 'role', 'city', 'state', 'country', 'country_code'],
				where: { userId: req.params.id }
			})

			if (!userProfile) {
				return res.status(404).json({
					success: false,
					data: 'User not found!'
				});
			}

			res.status(200).json({
				success: true,
				userProfile: userProfile
			});

		} catch (error) {
			res.status(500).json({
				success: false,
				error: error.message
			});
		}
	},

	updateUser: async (req, res) => {
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
				username: body.username || user.username,
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
	},

	deleteUser: async (req, res) => {
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
};

module.exports = userController;
