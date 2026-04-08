const jwt = require("jsonwebtoken")

const roleValidator = {
	checkRole: (role) => {
		return (req, res, next) => {
			const decoded = jwt.decode(req.token)

			if (role === decoded.role && req.body.userId == decoded.userId) {
				next();
			} else {
				res.status(403).json({
					success: false,
					message: "Forbidden Access, required role: " + role
				});
			}
		}
	}
};

module.exports = roleValidator;
