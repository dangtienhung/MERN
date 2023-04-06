import User from '../models/users.model.js';

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
			return res.status(200).json(response);
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
	/* delete */
	deleteUser: async (req, res) => {
		try {
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
