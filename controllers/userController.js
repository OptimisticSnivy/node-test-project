const User = require('../models/User')

// Create a user
exports.createUser = async (req, res) => {
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

exports.updateUser = async (req, res) => {
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

}

exports.deleteUser = async (req, res) => {
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
}
