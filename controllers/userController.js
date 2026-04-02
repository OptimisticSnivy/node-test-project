const User = require('../models/User')
const bcrypt = require('bcrypt')

// Create a user
exports.createUser = async (req, res) => {
	try {
		const saltRounds = 10

		const {
			username,
			email,
			password,
			city,
			state,
			country,
			country_code,
			phone_number
		} = req.body;

		const salt = await bcrypt.genSalt(saltRounds)
		const passwordHash = await bcrypt.hash(password, salt)

		const user = await User.create({
			username,
			email,
			password: passwordHash,
			city,
			state,
			country,
			country_code,
			phone_number
		});

		res.status(201).json({ success: true, data: user });
	}
	catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
}

exports.getAllUsers = async (req, res) => {
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

exports.getUserById = async (req, res) => {
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

exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({
				success: false,
				data: 'User not found!'
			});
		}

		const {
			username,
			email,
			city,
			state,
			country,
			country_code,
			phone_number
		} = req.body;

		await user.update({
			username: username || user.name,
			email: email || user.email,
			city: city || user.city,
			state: state || user.state,
			country: country || user.country,
			country_code: country_code || user.country_code,
			phone_number: phone_number || user.phone_number,
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

exports.deleteUser = async (req, res) => {
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
