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

const imageSchemas = new mongoose.Schema(
	{
		base_url: {
			type: String,
			required: true,
		},
		medium_url: {
			type: String,
			required: true,
		},
		thumb_url: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		url_viewer: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false }
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
		images: [imageSchemas],
		brand: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Brand',
		},
		specifications: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Specifiction',
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Product', productSchema);
