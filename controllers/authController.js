const bcrypt = require('bcrypt')
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const Otp = require('../models/Otp')
const User = require('../models/User')
const mailer = require("../mailer.js")
const genHashedPass = require('../utils')

const authController = {

	login: async (req, res) => {
		try {
			const body = req.body;

			const user = await User.findOne({ where: { username: body.username } })
			if (!user) {
				return res.status(400).json({ success: false, error: 'Username is incorrect!' });
			}
			const passwordCheck = await bcrypt.compare(body.password, user.password)
			if (!passwordCheck) {
				return res.status(400).json({ success: false, error: 'Password is incorrect!' });
			}
			const username = user.username

			jwt.sign({ username }, 'privateKey', { expiresIn: 60 * 60 }, (err, token) => {
				if (err) {
					console.log(err)
				}
				res.status(200).json({
					success: true,
					token: token
				});
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				error: error.message
			});
		}
	},

	forgotPasswordReq: async (req, res) => {
		try {
			const body = req.body;

			const user = await User.findOne({ where: { email: body.email } })
			if (!user) {
				return res.status(400).json({ success: false, error: 'Invalid Email-Id' });
			}

			const code = crypto.randomInt(100000, 999999)

			await mailer.otpSender(body.email, code);

			const otp = await Otp.create({
				code: code,
				expiresAt: new Date(Date.now() + 60 * 10 * 1000), // date.now() returns milliseconds!
				isVerified: false,
				userId: user.userId
			});

			res.status(200).json({
				success: true,
				message: "Email has been sent to your registered EmailID!"
			});
		} catch (error) {
			res.status(500).json({ success: false, error: error });
		}
	},

	verifyOtp: async (req, res) => {
		try {
			const body = req.body

			const user = await User.findOne({
				where: { email: body.email }
			})

			const otp = await Otp.findOne({
				where: { userId: user.userId },
				order: [['createdAt', 'DESC']]
			})

			if (new Date(Date.now()) < otp.expiresAt && otp.code == body.code && otp.isVerified == false) {
				await otp.update({
					isVerified: true
				})

				const passwordHash = await genHashedPass(body.password, 10)

				await user.update({
					password: passwordHash
				})

				return res.status(200).json({
					success: true,
					message: "Password has been reset!"
				})
			}
			res.status(400).json({ success: false, error: 'OTP is incorrect/expired!' });
		} catch (error) {
			res.status(500).json({ success: false, error: error.message });
		}
	}
}

module.exports = authController;
