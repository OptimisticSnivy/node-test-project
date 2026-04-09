const jwt = require("jsonwebtoken")

const roleValidator = {
	checkRole: (role) => {
		return (req, res, next) => {
			const user = req.user

			if (role === user.role) {
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
