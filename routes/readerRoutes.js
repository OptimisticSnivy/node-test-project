const express = require('express')
const authValidator = require('../middleware/authValidator')
const readerController = require('../controllers/readerController')

const router = express.Router();

router.post('/borrow/:bookId', authValidator.checkToken, readerController.borrowBook)

module.exports = router;
