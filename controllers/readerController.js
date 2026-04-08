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
					role: 'reader'
				}
			})

			if (!book && !user) {
				return res.status(404).json({
					success: false,
					message: "Book/User not found!"
				});
			}

			// see if all these checks can be done cleaner?
			const currReaders = await Reader.findAll({
				where: { bookId: book.bookId }
			})

			const currReads = await Reader.findAll({
				where: { userId: user.userId }
			})

			if (currReaders.length >= book.qty || currReads.length >= 4) {
				return res.status(400).json({
					success: false,
					message: "Book not available!"
				});
			}

			const isUnique = await Reader.findOne({
				where: {
					userId: user.userId,
					bookId: book.bookId
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
