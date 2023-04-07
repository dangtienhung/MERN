import joi from 'joi';

export const specificationValidation = joi.object({
	name: joi.string().required().messages({
		'string.empty': 'Name is required',
		'any.required': 'Name is required',
	}),
	// attributes: joi
	// 	.array()
	// 	.required()
	// 	.min(1)
	// 	.items(
	// 		joi.object({
	// 			code: joi.string().required().messages({
	// 				'string.empty': 'Code is required',
	// 				'any.required': 'Code is required',
	// 			}),
	// 			name: joi.string().required().messages({
	// 				'string.empty': 'Name is required',
	// 				'any.required': 'Name is required',
	// 			}),
	// 			value: joi.string().required().messages({
	// 				'string.empty': 'Value is required',
	// 				'any.required': 'Value is required',
	// 			}),
	// 		})
	// 	)
	// 	.messages({
	// 		'array.base': 'Attributes must be an array',
	// 		'any.required': 'Attributes is required',
	// 		'array.min': 'Attributes must have at least 1 item',
	// 	}),
});
