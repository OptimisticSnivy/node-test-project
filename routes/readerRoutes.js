const express = require('express')
const authValidator = require('../middleware/authValidator')
const roleValidator = require('../middleware/roleValidator')
const readerController = require('../controllers/readerController')

const router = express.Router();

router.post('/borrow/:bookId', authValidator.checkToken, roleValidator.checkRole('reader'), readerController.borrowBook)

router.put('/return/:bookId', authValidator.checkToken, roleValidator.checkRole('reader'), readerController.returnBook)

module.exports = router;
