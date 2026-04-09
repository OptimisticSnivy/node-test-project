const express = require('express')
const validators = require('../middleware/validators.js')
const authController = require('../controllers/authController.js')

const router = express.Router();

router.get('/login',
	validators.validate(validators.loginSchema),
	authController.login)

router.post('/forgot-password',
	validators.validate(validators.forgotPassSchema),
	authController.forgotPasswordReq)

router.post('/verify-otp',
	validators.validate(validators.verifyOtpSchema),
	authController.verifyOtp)

module.exports = router;
