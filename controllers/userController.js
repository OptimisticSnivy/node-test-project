const User = require('../models/User')

// Create a user
exports.createUser = async (req, res) => {
	try {
		const {
			username,
			email,
			passwordHash,
			city,
			state,
			country,
			country_code,
			phone_number
		} = req.body;

		const user = await User.create({
			username,
			email,
			passwordHash,
			city,
			state,
			country,
			country_code,
			phone_number
		});

		res.status(201).json({ success: true, data: user });
	}
	catch {
		res.status(400).json({
			success: false,
			error: error.message
		})
	}
}

// Get all users
exports.getAllUsers = async (req, res) => {
	const users = await User.findAll();
	res.status(200).json({
		success: true,
		count: users.length,
		data: users
	});
}

exports.getUserById = async (req, res) => {
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
}
