import mongoose from 'mongoose';

const specificationSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		attributes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Attribute',
			},
		],
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Specification = mongoose.model('Specifiction', specificationSchema);

export default Specification;
