import joi from 'joi';

export const AtributeValidation = joi.object({
	code: joi.string().required().messages({
		'string.empty': 'Code is required',
		'any.required': 'Code is required',
	}),
	name: joi.string().required().messages({
		'string.empty': 'Name is required',
		'any.required': 'Name is required',
	}),
	value: joi.string().required().messages({
		'string.empty': 'Value is required',
		'any.required': 'Value is required',
	}),
});
