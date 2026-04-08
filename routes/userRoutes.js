const express = require('express')
const authValidator = require('../middleware/authValidator')
const validators = require('../middleware/validators')
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/', validators.validate(validators.userSchema), userController.createUser)

router.get('/', authValidator.checkToken, userController.getAllUsers)
router.get('/:id', authValidator.checkToken, userController.getUserById)

router.get('/:id/profile', authValidator.checkToken, userController.getUserProfile)

router.put('/:id', validators.validate(validators.updateUserSchema), authValidator.checkToken, userController.updateUser)

router.delete('/:id', authValidator.checkToken, userController.deleteUser)

module.exports = router;
