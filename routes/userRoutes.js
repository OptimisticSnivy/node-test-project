const express = require('express')
const authValidator = require('../middleware/authValidator')
const userValidator = require('../middleware/userValidator')
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/', userValidator, userController.createUser)

router.get('/', authValidator.checkToken, userController.getAllUsers)
router.get('/:id', authValidator.checkToken, userController.getUserById)

router.put('/:id', authValidator.checkToken, userController.updateUser)

router.delete('/:id', userController.deleteUser)

module.exports = router;
