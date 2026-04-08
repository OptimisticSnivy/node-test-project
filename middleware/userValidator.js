const Joi = require('joi')
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const userSchema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().trim().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
	role: Joi.string().trim().required(),
	currReads: Joi.number(),
	city: Joi.string().trim().required(),
	state: Joi.string().trim().required(),
	country: Joi.string().trim().required(),
	country_code: Joi.string().trim().required(),
	phone_number: myCustomJoi.string().trim().phoneNumber().required(),
})

const validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	next();
};

module.exports = validateUser;
