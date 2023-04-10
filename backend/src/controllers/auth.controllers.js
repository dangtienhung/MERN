import User from '../models/users.model.js';
import { userValidatorRegister } from '../validate/user.validate.js';

export const authControllers = {
	/* get all */
	getAllUsers: async (req, res) => {
		try {
			const response = await User.find();
			if (!response) {
				return res.status(404).json({
					message: 'User does not exist',
				});
			}
			const users = response.map((user) => {
				const { password, ...data } = user._doc;
				return data;
			});
			return res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({ message: 'Internal server error' });
		}
	},
	/* get one */
	getOneUser: async (req, res) => {
		try {
			const users = await User.findById(req.params.id);
			if (!users) {
				return res.status(404).json({
					message: 'User does not exist',
				});
			}
			return res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({ message: 'Internal server error' });
		}
	},
	/* update */
	updateUser: async (req, res) => {
		try {
			const body = req.body;
			/* validate */
			const { error } = userValidatorRegister.validate(body, {
				abortEarly: false,
			});
			if (error) {
				const errors = error.details.map((err) => err.message);
				return res.status(400).json({ message: errors });
			}
			/* update */
			const users = await User.findByIdAndUpdate(req.params.id, body, {
				new: true,
			});
			if (!users) {
				return res.status(404).json({
					message: 'User does not exist',
				});
			}
			return res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({ message: 'Internal server error' });
		}
	},
	/* delete */
	deleteUser: async (req, res) => {
		try {
			const admin = await User.findById(req.params.id);
			const { role } = admin;
			if (role === 'admin') {
				return res.status(400).json({ message: 'You cannot delete admin' });
			}
			const user = await User.findByIdAndDelete(req.params.id);
			if (!user) {
				return res.status(404).json({
					message: 'User does not exist',
				});
			}
			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json({ message: 'Internal server error' });
		}
	},
};
