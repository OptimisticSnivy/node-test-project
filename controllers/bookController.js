const Book = require('../models/Book');
const User = require('../models/User')

const bookController = {
	createBook: async (req, res) => {
		try {
			const body = req.body

			const bookExists = await Book.findOne({
				where: { name: body.name }
			})

			const user = await User.findOne({
				where: {
					userId: body.userId,
					role: 'author'
				}
			})

			if (!bookExists && user) {
				const book = await Book.create({
					name: body.name,
					author: body.author,
					qty: body.qty,
					userId: user.userId
				});

				return res.status(201).json({ success: true, data: book });
			}

			res.status(400).json({ success: false, error: 'Book already exists!' });
		} catch (error) {
			res.status(500).json({ success: false, error: error.message });
		}
	},

	updateBookQty: async (req, res) => {
		try {
			const book = await Book.findByPk(req.params.id);
			if (!book) {
				return res.status(404).json({
					success: false,
					data: 'Book not found!'
				});
			}

			const body = req.body;

			await book.update({
				qty: body.qty
			})

			res.status(200).json({
				success: true,
				data: book
			});

		} catch (error) {
			res.status(500).json({
				success: false,
				error: error.message
			});
		}

	},

	deleteBook: async (req, res) => {
		try {
			const book = await Book.findByPk(req.params.id);
			if (!book) {
				return res.status(404).json({
					success: false,
					data: 'Book not found!'
				});
			}

			await book.destroy();

			res.status(200).json({
				success: true,
				data: book
			});
		} catch (error) {
			res.status(500).json({
				success: true,
				error: error.message
			});
		}
	}
};

module.exports = bookController;
