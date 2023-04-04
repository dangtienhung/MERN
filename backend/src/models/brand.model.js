import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
	},
	{ timestamp: true, versionKey: false }
);

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
