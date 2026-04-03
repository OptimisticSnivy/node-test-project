const authValidator = {};

authValidator.checkToken = (req, res, next) => {
	const headers = req.headers['authorization']

	if (headers !== undefined) {
		const token = headers.split(' ')[1]

		req.token = token

		next();
	} else {
		res.status(403).json({ success: false, error: 'Forbidden access' });
	}
}

module.exports = authValidator;
