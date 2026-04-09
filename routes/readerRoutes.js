const express = require('express')
const authValidator = require('../middleware/authValidator')
const roleValidator = require('../middleware/roleValidator')
const validators = require('../middleware/validators')
const readerController = require('../controllers/readerController')

const router = express.Router();
router.post('/borrow/:bookId', validators.validate(validators.handleBookSchema), authValidator.checkToken, roleValidator.checkRole('reader'), readerController.borrowBook)

router.put('/return/:bookId', validators.validate(validators.handleBookSchema), authValidator.checkToken, roleValidator.checkRole('reader'), readerController.returnBook)

module.exports = router;
