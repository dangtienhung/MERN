import User from '../models/users.model.js';
import jwt from 'jsonwebtoken';

export const checkPermisstion = async (req, res, next) => {
	try {
		/* kiểm tra user có đăng nhập không */
		if (!req.headers.authorization) {
			throw new Error(`người dùng chưa đăng nhập`);
		}
		/* lấy jwt từ header */
		const token = req.headers.authorization.split(' ')[1];
		/* xác thực token */
		const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);
		/* lấy thông tin user */
		const user = await User.findById(_id);
		console.log(
			'🚀 ~ file: checkPermission.js:16 ~ checkPermisstion ~ user:',
			user
		);
		/* kiểm tra phân quyền */
		if (!user.role) {
			throw new Error('User does not exist');
		}
		/* gán giá trị của user vào req */
		req.user = user;
		next();
	} catch (error) {
		return res.status(403).json({
			message: 'Invalid authorization',
		});
	}
};
