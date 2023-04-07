import Specification from '../models/specifications.model.js';
import { specificationValidation } from '../validate/specification.validate.js';

export const specificationControllers = {
	/* create */
	createSpecification: async (req, res) => {
		try {
			const body = req.body;
			/* validate */
			const { error } = specificationValidation.validate(body, {
				abortEarly: false,
			});
			if (error) {
				const errors = error.details[0].map((err) => err.message);
				return res.stauts(400).json(errors);
			}
			/* create */
			const specification = await Specification.create(body);
			if (!specification) {
				return res.status(400).json({ message: 'Create specification failed' });
			}
			return res.status(200).json(specification);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	/* get all */
	getAllSpecifications: async (req, res) => {
		try {
			const specifications = await Specification.find().populate('attributes');
			if (!specifications) {
				return res
					.status(400)
					.json({ message: 'Get all specifications failed' });
			}
			return res.status(200).json(specifications);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	/* get one */
	getOneSpecification: async (req, res) => {
		try {
			const specification = await Specification.findById(req.params.id)
				.populate('attributes')
				.populate('products');
			if (!specification) {
				return res
					.status(400)
					.json({ message: 'Get one specification failed' });
			}
			return res.status(200).json(specification);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	/* update */
	updateSpecification: async (req, res) => {
		try {
			/* validate */
			const { error } = specificationValidation.validate(req.body, {
				abortEarly: false,
			});
			if (error) {
				const errors = error.details[0].map((err) => err.message);
				return res.status(400).json(errors);
			}
			/* update */
			const specification = await Specification.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true }
			);
			if (!specification) {
				return res.status(400).json({ message: 'Update specification failed' });
			}
			return res.status(200).json(specification);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	/* delete */
	deleteSpecification: async (req, res) => {
		try {
			const specification = await Specification.findByIdAndDelete(
				req.params.id
			);
			if (!specification) {
				return res.status(400).json({ message: 'Delete specification failed' });
			}
			return res.status(200).json(specification);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
};
