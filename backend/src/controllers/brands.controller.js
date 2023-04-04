import Brand from '../models/brand.model.js';
import { brandValidate } from '../validate/brand.validate.js';

export const brandController = {
	/* post */
	createBrand: async (req, res) => {
		try {
			const body = req.body;
			console.log(
				'🚀 ~ file: brands.controller.js:9 ~ createBrand: ~ body:',
				body
			);
			return;
			/* validate */
			const { error } = brandValidate.validate(body, { abortEarly: false });
			if (error) {
				const errors = error.details.map((err) => err.message);
				return res.status(400).json({ message: errors });
			}
			/* create brand */
			const brand = await Brand.create(body);
			if (!brand) {
				return res.status(400).json({ message: 'Create brand failed' });
			}
			return res
				.status(200)
				.json({ message: 'Create brand successfully', brand });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* get all brand */
	getAllBrand: async (req, res) => {
		try {
			const brands = await Brand.find();
			if (!brands) {
				return res.status(400).json({ message: 'Get brands failed' });
			}
			return res
				.status(200)
				.json({ message: 'Get brands successfully', brands });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* get one */
	getOneBrand: async (req, res) => {
		try {
			const id = req.params.id;
			const brand = await Brand.findById(id).populate('products');
			if (!brand) {
				return res.status(400).json({ message: 'Get brand failed' });
			}
			return res.status(200).json({ message: 'Get brand successfully', brand });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* update brand */
	updateBrand: async (req, res) => {
		try {
			/* validate */
			const { error } = brandValidate.validate(req.body, { abortEarly: false });
			if (error) {
				const errors = error.details.map((err) => err.message);
				return res.status(400).json({ message: errors });
			}
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* delete brand */
	deleteBrand: async (req, res) => {
		try {
			const id = req.params.id;
			const brand = await Brand.findByIdAndDelete(id);
			if (!brand) {
				return res.status(400).json({ message: 'Delete brand failed' });
			}
			return res
				.status(200)
				.json({ message: 'Delete brand successfully', brand });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
};
