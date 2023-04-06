import mongoose from 'mongoose';

const attributeSchema = new mongoose.Schema(
	{
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
	},
	{ timestamps: true, versionKey: false }
);

const Attribute = mongoose.model('Attribute', attributeSchema);
export default Attribute;
