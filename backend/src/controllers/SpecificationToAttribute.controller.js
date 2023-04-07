import SpecificationToAttribute from '../models/SpecificationToAttribute.js';

export const specificationToAttributeControllers = {
	/* create */
	createSpecificationToAttribute: async (req, res) => {
		try {
			const body = req.body;
			const specificationToAttribute = await SpecificationToAttribute.create(
				body
			);
			if (!specificationToAttribute) {
				return res.status(400).json('Create specification to attribute failed');
			}
			return res.status(200).json(specificationToAttribute);
		} catch (error) {
			return res.status(500).json('Create specification to attribute failed');
		}
	},
};
