const express = require('express')
const validators = require('../middleware/validators')
const authValidator = require('../middleware/authValidator')
const roleValidator = require('../middleware/roleValidator')
const bookController = require('../controllers/bookController')

const router = express.Router();

router.post('/',
	validators.validate(validators.bookSchema),
	authValidator.checkToken,
	roleValidator.checkRole('author'),
	bookController.createBook)

router.get('/',
	authValidator.checkToken,
	bookController.getAllBooks)

router.get('/:id',
	authValidator.checkToken,
	bookController.getBookById)

router.put('/:id',
	validators.validate(validators.updateQtySchema),
	authValidator.checkToken,
	roleValidator.checkRole('author'),
	bookController.updateBookQty)

router.delete('/:id',
	authValidator.checkToken,
	roleValidator.checkRole('author'),
	bookController.deleteBook)

module.exports = router;
