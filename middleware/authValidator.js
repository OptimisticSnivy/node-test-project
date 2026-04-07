const jwt = require("jsonwebtoken")

const authValidator = {

	checkToken: (req, res, next) => {
		const headers = req.headers['authorization']

		if (headers !== undefined) {
			const token = headers.split(' ')[1]

			jwt.verify(token, 'privateKey', (err) => {
				if (err) {
					return res.status(403).json({
						success: false,
						error: err
					});
				}
				next();
			})
		} else {
			res.status(403).json({ success: false, error: 'Forbidden access' });
		}
	}
};

module.exports = authValidator;
