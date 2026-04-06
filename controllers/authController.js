const bcrypt = require('bcrypt')
const mailer = require("../mailer.js")
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
				const username = user.username

				jwt.sign({ username }, 'privateKey', (err, token) => {
					if (err) {
						console.log(err)
					}
					res.status(200).json({
						success: true,
						token: token
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

authController.forgotPasswordReq = async (req, res) => {
	const body = req.body;

	const user = await User.findOne({ where: { email: body.email } })
	if (user === null) {
		res.status(400).json({ success: false, error: 'Invalid Email-Id' });
	} else {
		mailer.otpSender(body.email);
		res.status(200).json({
			success: true,
			message: "Email has been sent to your registered EmailID!"
		});
	}
}

// authController.verifyOtp = async (req, res) => {
// 	const body = req.body
// 	if 
//
// }

module.exports = authController;
