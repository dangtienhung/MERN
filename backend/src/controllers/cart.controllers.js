import Cart from '../models/cart.model.js';

export const cartController = {
	/* post */
	createCart: async (req, res) => {
		try {
			const body = req.body;
			const cart = await Cart.findOne({ userId: body.userId });
			if (!cart) {
				const newCart = await Cart.create({
					userId: body.userId,
					items: [{ productId: body.productId, quantity: 1 }],
				});
				return res.status(201).json(newCart);
			}
			/* nếu giỏ hàng đã tồn tại */
			const exitsItem = cart.items.find((item) => {
				return item.productId == body.productId;
			});
			if (exitsItem) {
				// Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng sản phẩm đó lên 1
				exitsItem.quantity++;
			} else {
				// Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng
				cart.items.push({ productId: body.productId, quantity: 1 });
			}
			/* update */
			const cartItem = await cart.save();
			return res
				.status(200)
				.json({ message: 'Update cart successfully', cart: cartItem });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* get all carts */
	getAllCart: async (req, res) => {
		try {
			const carts = await Cart.find()
				.populate({ path: 'userId', select: 'name email' })
				.populate({ path: 'items.productId', select: 'name price images' });
			if (!carts) {
				return res.status(404).json({ message: 'Cart not found' });
			}
			return res.status(200).json(carts);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* get one carts */
	getOneCart: async (req, res) => {
		try {
			const cart = await Cart.findById(req.params.id)
				.populate({ path: 'userId', select: 'name email' })
				.populate({ path: 'items.productId', select: 'name price' });
			if (!cart) {
				return res.status(404).json({ message: 'Cart not found' });
			}
			return res.status(200).json(cart);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	/* delete cart */
	deleteCart: async (req, res) => {
		try {
			const cart = await Cart.findByIdAndDelete(req.params.id);
			if (!cart) {
				return res.status(404).json({ message: 'Cart not found' });
			}
			return res.status(200).json({ message: 'Delete cart successfully' });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
};
