import { __dirname } from '../server.js';
import express from 'express';
import fs from 'fs';
import { getRandomFileName } from '../utils/utils.js';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

const router = express.Router();

const upload = multer({
	limits: {
		fileSize: 4 * 1024 * 1024,
	},
});

router.post('/', upload.single('image'), async (req, res) => {
	const imageName = getRandomFileName() + '.png';
	const imagePath = path.join(__dirname, `/images/${imageName}`);
	await sharp(req.file.buffer).toFile(imagePath);
	res.end(imageName);
});

router.delete('/delete/:imageName', async (req, res) => {
	const linkImage = req.params.imageName;
	const imagePath = path.join(__dirname, `/images/${linkImage}`);
	try {
		await fs.promises.unlink(imagePath);
		return res.send('Delete success');
	} catch (error) {
		return res.status(500).send('Đã xảy ra lỗi khi xóa hình ảnh');
	}
});

export default router;
