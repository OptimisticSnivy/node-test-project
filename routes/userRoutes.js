const express = require('express')
const router = express.Router();
const userValidator = require('../middleware/userValidator')
const userController = require('../controllers/userController')

router.post('/', userValidator, userController.createUser)

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)

router.put('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)

module.exports = router;
