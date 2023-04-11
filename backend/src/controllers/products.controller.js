import Brand from '../models/brand.model.js';
import Product from '../models/products.model.js';
import Specification from '../models/specifications.model.js';
import { productValidator } from '../validate/product.validate.js';

export const productController = {
	/* post */
	createProduct: async (req, res) => {
		try {
			const body = req.body;
			/* validate */
			const { error } = productValidator.validate(body, {
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
			/* update references */
			await Brand.findByIdAndUpdate(product.brand, {
				$addToSet: {
					products: product._id,
				},
			});
			await Specification.findByIdAndUpdate(product.specifications, {
				$addToSet: {
					products: product._id,
				},
			});
			/* trả về kết quả */
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
			/* search query */
			const query = req.query.q;
			if (query) {
				const searchOption = query
					? {
							$or: [
								{ name: { $regex: query, $options: 'i' } },
								{ description: { $regex: query, $options: 'i' } },
							],
					  }
					: {};
				try {
					const products = await Product.find(searchOption)
						.populate('brand')
						.populate({
							path: 'specifications',
							populate: {
								path: 'attributes',
							},
						});
					if (!products) {
						return res.status(400).json({ message: 'Get products failed' });
					}
					return res
						.status(200)
						.json({ message: 'Get products successfully', products });
				} catch (error) {
					return res.status(500).json({ message: error.message });
				}
			}

			const products = await Product.find()
				.populate('brand')
				.populate({
					path: 'specifications',
					populate: {
						path: 'attributes',
					},
				});
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
			const product = await Product.findById({ _id: id })
				.populate('brand')
				.populate({
					path: 'specifications',
					populate: {
						path: 'attributes',
					},
				});
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
			const { error } = productValidator.validate(body, { abortEarly: false });
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
