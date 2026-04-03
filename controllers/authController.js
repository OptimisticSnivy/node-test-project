const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require('../models/User')

const authController = {};

authController.login = async (req, res) => {
	try {
		const body = req.body;

		const user = await User.findOne({ where: { username: body.username } })
		if (user === null) {
			res.status(400).json({ success: false, error: 'Username is incorrect!' });
		} else {
			const passwordCheck = await bcrypt.compare(body.password, user.password)
			if (passwordCheck !== null) {
				jwt.sign({ user }, 'privateKey', { expiresIn: '1h' }, (err, token) => {
					if (err) {
						console.log(err)
					}
					res.status(200).json({
						token: token,
						success: true
					});
				})
			} else {
				res.status(400).json({ success: false, error: 'Password is incorrect!' });
			}
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message
		});
	}
}

module.exports = authController;
