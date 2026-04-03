const express = require('express')
const authController = require('../controllers/authController.js')

const router = express.Router();

router.get('/login', authController.login)

module.exports = router;
