import joi from 'joi';

export const brandValidate = joi.object({
	name: joi.string().required().messages({
		'string.empty': 'Name is required',
		'any.required': 'Name is required',
	}),
});
