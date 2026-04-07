const express = require('express')
const authController = require('../controllers/authController.js')

const router = express.Router();

router.get('/login', authController.login)
router.post('/forgot-password', authController.forgotPasswordReq) // not made a validator yet! 
router.post('/verify-otp', authController.verifyOtp) // not made a validator yet! 

module.exports = router;
