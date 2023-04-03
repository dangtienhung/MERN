import mongoose from 'mongoose';

const validRoles = ['customer', 'admin', 'super_admin'];

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: validRoles,
			default: 'customer',
		},
	},
	{ timestamps: true, versionKey: false }
);

const User = mongoose.model('User', userSchema);
export default User;
