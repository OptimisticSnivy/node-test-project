const Joi = require('joi');
const { verify } = require('otplib');
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const validators = {
	userSchema: Joi.object({
		username: Joi.string().min(3).max(30).required().messages(),
		email: Joi.string().email().trim().required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages(),
		role: Joi.string().trim().required(),
		currReads: Joi.number(),
		city: Joi.string().trim().required(),
		state: Joi.string().trim().required(),
		country: Joi.string().trim().required(),
		country_code: Joi.string().trim().required(),
		phone_number: myCustomJoi.string().trim().phoneNumber().required()
	}),

	updateUserSchema: Joi.object({
		username: Joi.string().min(3).max(30).required(),
		city: Joi.string().trim().required(),
		state: Joi.string().trim().required(),
		country: Joi.string().trim().required()
	}),

	loginSchema: Joi.object({
		username: Joi.string().min(3).max(30).required(),
		password: Joi.string().required()
	}),

	forgotPassSchema: Joi.object({
		email: Joi.string().email().trim().required()
	}),

	verifyOtpSchema: Joi.object({
		email: Joi.string().email().trim().required(),
		code: Joi.string().trim().length(6).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
	}),

	bookSchema: Joi.object({
		userId: Joi.string().trim().required(),
		name: Joi.string().trim().required(),
		author: Joi.string().trim().required(),
		qty: Joi.number().required()
	}),

	updateQtySchema: Joi.object({
		qty: Joi.number().required()
	}),

	handleBookSchema: Joi.object({
		userId: Joi.string().trim().required(),
	}),

	validate: (schema) => {
		return (req, res, next) => {
			const { error } = schema.validate(req.body);
			if (error) {
				return res.status(400).send(error.details[0].message);
			}
			next();
		}
	}
};

module.exports = validators;
