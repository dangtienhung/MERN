import Specification from './specifications.model.js';
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
		brandId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Brand',
		},
		specificationsId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Specification',
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Product', productSchema);
