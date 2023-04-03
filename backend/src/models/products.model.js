import mongoose from 'mongoose';

/* images */
const imageSchema = new mongoose.Schema(
	{
		base_url: {
			type: String,
			required: true,
		},
		is_gallery: {
			type: Boolean,
		},
		label: {
			type: String,
			default: null,
		},
		large_url: {
			type: String,
			required: true,
		},
		medium_url: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			default: null,
		},
		small_url: {
			type: String,
			required: true,
		},
		thumbnail_url: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

/* brand */
const branchSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
});

/* specifications */
const attributesSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
});
const specificationSchema = new mongoose.Schema({
	name: { type: String, required: true },
	attributes: [attributesSchema],
});

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		original_price: {
			type: Number,
			required: true,
		},
		images: [imageSchema],
		brand: branchSchema,
		specifications: [specificationSchema],
	},
	{ timestamps: true }
);

export default mongoose.model('Product', productSchema);
