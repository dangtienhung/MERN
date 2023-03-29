import { checkPermisstion } from '../middlewares/checkPermission.js';
import express from 'express';
import { productController } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/products', checkPermisstion, productController.createProduct);
router.get('/products', productController.getAllProduct);
router.get('/products/:id', productController.getOneProduct);
router.put('/products/:id', checkPermisstion, productController.updateProduct);
router.delete(
	'/products/:id',
	checkPermisstion,
	productController.deleteProduct
);

/* tìm kiếm sản phẩm theo tên || descr */
router.get('/search', productController.searchProduct);

export default router;
