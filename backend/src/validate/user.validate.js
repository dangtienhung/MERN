import joi from 'joi';

export const userValidatorRegister = joi.object({
	username: joi.string().required().messages({
		'string.empty': 'Please enter a username',
		'any.required': 'Please enter any required',
	}),
	email: joi.string().email().required().messages({
		'string.email': 'Please enter a valid email address',
		'string.empty': 'Please enter a email',
		'any.required': 'Please enter any required',
	}),
	password: joi.string().required().messages({
		'string.password': 'Please enter a password',
		'string.empty': 'Please enter a password',
		'any.required': 'Please enter any required',
	}),
	confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
		'string.password': 'Please enter a password',
		'string.empty': 'Please enter a password',
		'any.required': 'Please enter password confirm required',
		'any.only': 'Password does not match',
	}),
	role: joi
		.string()
		.valid('admin', 'super_admin', 'customer')
		.default('customer')
		.messages({
			'string.empty': 'Please enter a role',
			'any.required': 'Please enter any required',
		}),
});

export const userValidatorLogin = joi.object({
	email: joi.string().email().required().messages({
		'string.email': 'Please enter a valid email address',
		'string.empty': 'Please enter a email',
		'any.required': 'Please enter any required',
	}),
	password: joi.string().required().messages({
		'string.password': 'Please enter a password',
		'string.empty': 'Please enter a password',
		'any.required': 'Please enter any required',
	}),
});
