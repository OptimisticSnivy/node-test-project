const express = require('express')
const { body } = require("express-validator")
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/', userController.createUser)

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)

router.put('/:id', body('email').trim().isEmail(), userController.updateUser)

router.delete('/:id', userController.deleteUser)

module.exports = router;
