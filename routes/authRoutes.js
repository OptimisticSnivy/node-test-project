const express = require('express')
const authController = require('../controllers/authController.js')

const router = express.Router();

router.get('/login', authController.login)
router.post('/forgot-password', authController.forgotPasswordReq)
router.post('/verify-otp', authController.verifyOtp)

module.exports = router;
