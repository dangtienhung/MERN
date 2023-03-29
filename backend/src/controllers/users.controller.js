import * as dotenv from 'dotenv';

import {
	userValidatorLogin,
	userValidatorRegister,
} from '../validate/user.validate.js';

import User from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

export const userControllers = {
	/* register */
	register: async (req, res) => {
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
			/* check email */
			const userExists = await User.findOne({ email: body.email });
			if (userExists) {
				return res.status(400).json({ message: 'Email already exists' });
			}
			/* hash password */
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(body.password, salt);
			const user = new User({
				username: body.username,
				email: body.email,
				password: hashPassword,
			});
			/* save user */
			const newUser = await user.save();
			const { password, ...data } = newUser._doc;
			return res.status(201).json({ message: 'Đăng ký thành công!', data });
		} catch (error) {
			return res.status(404).json({ message: error.message });
		}
	},
	/* login */
	login: async (req, res) => {
		try {
			const body = req.body;
			/* validate */
			const { error } = userValidatorLogin.validate(body, {
				abortEarly: false,
			});
			if (error) {
				const errors = error.details.map((err) => err.message);
				return res.status(400).json({ message: errors });
			}
			/* check email */
			const userExists = await User.findOne({ email: body.email });
			if (!userExists) {
				return res.status(400).json({ message: 'Email does not exists' });
			}
			/* check password */
			const validPassword = await bcrypt.compare(
				body.password,
				userExists.password
			);
			if (!validPassword) {
				return res.status(400).json({ message: 'Password is incorrect' });
			}
			/* create token */
			const token = jwt.sign(
				{ _id: userExists._id },
				process.env.TOKEN_SECRET,
				{ expiresIn: '1d' }
			);
			const userInfo = { ...userExists._doc };
			const { password, ...data } = userInfo;
			return res.status(200).json({
				message: 'Đăng nhập thành công!',
				data: {
					acessToken: token,
					user: data,
				},
			});
		} catch (error) {
			return res.status(404).json({
				message: error.message,
			});
		}
	},
};
