import Product from '../models/products.model.js';
import { productValidate } from '../validate/product.validate.js';

export const productController = {
	/* post */
	createProduct: async (req, res) => {
		try {
			const body = req.body;
			/* validate */
			const { error } = productValidate.validate(body, {
				abortEarly: false,
			});
			if (error) {
				const errors = error.details.map((err) => err.message);
				return res.status(400).json({ message: errors });
			}
			/* create */
			const product = await Product.create(body);
			if (!product) {
				return res.status(400).json({ message: 'Create product failed' });
			}
			return res
				.status(200)
				.json({ message: 'Create product successfully', product });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* getAllProduct */
	getAllProduct: async (req, res) => {
		try {
			const products = await Product.find();
			if (!products) {
				return res.status(400).json({ message: 'Get products failed' });
			}
			return res
				.status(200)
				.json({ message: 'Get products successfully', products });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* get one products */
	getOneProduct: async (req, res) => {
		try {
			const id = req.params.id;
			const product = await Product.findOne({ _id: id });
			if (!product) {
				return res.status(400).json({ message: 'Get product failed' });
			}
			return res
				.status(200)
				.json({ message: 'Get product successfully', product });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* update product */
	updateProduct: async (req, res) => {
		try {
			const id = req.params.id;
			const body = req.body;
			const { error } = productValidate.validate(body, { abortEarly: false });
			if (error) {
				const errors = error.details.map((err) => err.message);
				return res.status(400).json({ message: errors });
			}
			const product = await Product.updateOne({ _id: id }, body);
			if (!product) {
				return res.status(400).json({ message: 'Update product failed' });
			}
			return res
				.status(200)
				.json({ message: 'Update product successfully', product });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* delete product */
	deleteProduct: async (req, res) => {
		try {
			const id = req.params.id;
			const product = await Product.findByIdAndDelete({ _id: id });
			if (!product) {
				return res.status(400).json({ message: 'Delete product failed' });
			}
			return res.status(200).json({ message: 'Product successfully deleted' });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* search query */
	searchProduct: async (req, res) => {
		try {
			const query = req.query.name || req.query.desc;
			const products = await Product.find({
				$or: [
					{ name: { $regex: query, $options: 'i' } },
					{ descr: { $regex: query, $options: 'i' } },
				],
			});
			if (!products) {
				return res.status(400).json({ message: 'Search product failed' });
			}
			return res
				.status(200)
				.json({ message: 'Search product successfully', products });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
};