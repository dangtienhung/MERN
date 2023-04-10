import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
		quantity: {
			type: Number,
			required: true,
			default: 1,
		},
	},
	{ versionKey: false, timestamps: true }
);

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		items: [cartItemSchema],
	},
	{ versionKey: false, timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
