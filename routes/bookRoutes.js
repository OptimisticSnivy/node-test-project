const express = require('express')
const authValidator = require('../middleware/authValidator')
const bookController = require('../controllers/bookController')

const router = express.Router();

// not made a validator yet! 
router.post('/', authValidator.checkToken, bookController.createBook)

router.get('/', authValidator.checkToken, bookController.getAllBooks)
router.get('/:id', authValidator.checkToken, bookController.getBookById)

router.put('/:id', authValidator.checkToken, bookController.updateBookQty)

router.delete('/:id', authValidator.checkToken, bookController.deleteBook)

module.exports = router;
