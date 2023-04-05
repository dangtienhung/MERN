import mongoose from 'mongoose';

const specificationSchema = new mongoose.Schema({
	name: { type: String, required: true },
	attributes: [
		{
			code: { type: String, required: true },
			name: { type: String, required: true },
			value: { type: String, required: true },
		},
	],
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
});

const Specification = mongoose.model('Specifiction', specificationSchema);

export default Specification;
