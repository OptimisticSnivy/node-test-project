const Book = require('../models/Book');
const User = require('../models/User')
const Reader = require('../models/Reader');

const readerController = {
	borrowBook: async (req, res) => {
		try {
			const body = req.body

			const book = await Book.findByPk(req.params.bookId)
			const user = await User.findOne({
				where: {
					userId: body.userId,
				}
			})

			if (!book || !user) {
				return res.status(404).json({
					success: false,
					message: "Book/User not found!"
				});
			}

			if (book.currReaders >= book.qty) {
				return res.status(400).json({
					success: false,
					message: "Book not available in quantity!"
				});
			}

			if (user.currReads >= book.qty) {
				return res.status(400).json({
					success: false,
					message: "Borrow limit exceeded!"
				});
			}

			const isUnique = await Reader.findOne({
				where: {
					userId: user.userId,
					bookId: book.bookId,
					isReturned: false
				}
			})

			if (isUnique) {
				return res.status(400).json({
					success: false,
					message: "can only fetch 1!"
				});
			}

			const reader = await Reader.create({
				bookBorrowed: book.name,
				issuedAt: new Date(Date.now()),
				isReturned: false,
				bookId: book.bookId,
				userId: user.userId
			})

			await user.increment('currReads', { by: 1 })
			await book.increment('currReaders', { by: 1 })

			res.status(200).json({
				success: true,
				data: reader
			});

		} catch (error) {
			res.status(500).json({
				success: false,
				error: error.message
			});
		}
	},

	returnBook: async (req, res) => {
		try {
			const body = req.body

			const book = await Book.findByPk(req.params.bookId)
			const user = await User.findOne({
				where: {
					userId: body.userId,
				}
			})

			if (!book && !user) {
				return res.status(404).json({
					success: false,
					message: "Book/User not found!"
				});
			}

			const reader = await Reader.findOne({
				where: {
					userId: user.userId,
					bookId: book.bookId,
					isReturned: false
				}
			})

			if (!reader) {
				return res.status(404).json({
					success: false,
					message: "Record doesn't exist or the book is returned!"
				});
			}

			await reader.update({
				isReturned: true
			})
			await user.decrement('currReads', { by: 1 })
			await book.decrement('currReaders', { by: 1 })

			res.status(200).json({
				success: true,
				data: reader
			});

		} catch (error) {
			res.status(500).json({
				success: false,
				error: error.message
			});
		}
	}
};

module.exports = readerController;
