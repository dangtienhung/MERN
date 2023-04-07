import mongoose from 'mongoose';

const specificationToAttributeSchema = new mongoose.Schema({
	specificationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Specification',
	},
	attributeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Attribute',
	},
});

const SpecificationToAttribute = mongoose.model(
	'SpecificationToAttribute',
	specificationToAttributeSchema
);
export default SpecificationToAttribute;
