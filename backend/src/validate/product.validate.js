import joi from 'joi';

/* validate image */
const imageValidate = joi.object({
	base_url: joi.string().required().messages({
		'string.empty': 'Base url is required',
		'any.required': 'Base url is required',
	}),
	is_gallery: joi.boolean().required().messages({
		'boolean.base': 'Is gallery must be a boolean',
		'any.required': 'Is gallery is required',
	}),
	label: joi.string().required().messages({
		'string.empty': 'Label is required',
		'any.required': 'Label is required',
	}),
	large_url: joi.string().required().messages({
		'string.empty': 'Large url is required',
		'any.required': 'Large url is required',
	}),
	medium_url: joi.string().required().messages({
		'string.empty': 'Medium url is required',
		'any.required': 'Medium url is required',
	}),
	position: joi.number().required().messages({
		'number.base': 'Position must be a number',
		'any.required': 'Position is required',
	}),
	small_url: joi.string().required().messages({
		'string.empty': 'Small url is required',
		'any.required': 'Small url is required',
	}),
	thumbnail_url: joi.string().required().messages({
		'string.empty': 'Thumbnail url is required',
		'any.required': 'Thumbnail url is required',
	}),
});

/* validate specifications */
const attributesValidate = joi.object({
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

export const productValidate = joi.object({
	name: joi.string().required().messages({
		'string.empty': 'Name is required',
		'any.required': 'Name is required',
	}),
	price: joi.number().required().messages({
		'number.base': 'Price must be a number',
		'any.required': 'Price is required',
	}),
	description: joi.string().required().messages({
		'string.empty': 'Description is required',
		'any.required': 'Description is required',
	}),
	original_price: joi.number().required().messages({
		'number.base': 'Original price must be a number',
		'any.required': 'Original price is required',
	}),
	images: joi.array().required().min(1).items(imageValidate).messages({
		'array.base': 'Images must be an array',
		'any.required': 'Images is required',
		'array.min': 'Images must have at least 1 item',
	}),
	brand: joi
		.object({
			name: joi.string().required().messages({
				'string.empty': 'Name is required',
				'any.required': 'Name is required',
			}),
			slug: joi.string().required().messages({
				'string.empty': 'Slug is required',
				'any.required': 'Slug is required',
			}),
		})
		.required()
		.messages({
			'object.base': 'Brand must be an object',
			'any.required': 'Brand is required',
		}),
	specifications: joi
		.array()
		.required()
		.min(1)
		.items(attributesValidate)
		.messages({
			'array.base': 'Specifications must be an array',
			'any.required': 'Specifications is required',
			'array.min': 'Specifications must have at least 1 item',
		}),
});

export const productValidator = joi.object({
	name: joi.string().required().messages({
		'string.empty': 'Name is required',
		'any.required': 'Name is required',
	}),
	price: joi.number().required().messages({
		'number.base': 'Price must be a number',
		'any.required': 'Price is required',
	}),
	description: joi.string().required().messages({
		'string.empty': 'Description is required',
		'any.required': 'Description is required',
	}),
	original_price: joi.number().required().messages({
		'number.base': 'Original price must be a number',
		'any.required': 'Original price is required',
	}),
	// images: joi.array().required().min(1).items(imageValidate).messages({
	// 	'array.base': 'Images must be an array',
	// 	'any.required': 'Images is required',
	// 	'array.min': 'Images must have at least 1 item',
	// }),
	brand: joi.string().required().messages({
		'string.empty': 'Brand is required',
		'any.required': 'Brand is required',
	}),
	specifications: joi.string().required().messages({
		'string.empty': 'Specifications is required',
		'any.required': 'Specifications is required',
	}),
	images: joi.array().items(joi.string().uri()).required().min(1).messages({
		'array.base': 'Images must be an array',
		'any.required': 'Images is required',
		'array.min': 'At least one image is required',
		'string.uri': 'Invalid image URL',
	}),
});
