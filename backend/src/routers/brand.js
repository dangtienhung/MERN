import { brandController } from '../controllers/brands.controller.js';
import { checkPermisstion } from '../middlewares/checkPermission.js';
import express from 'express';

const router = express.Router();

router.post('/brands', checkPermisstion, brandController.createBrand);
router.get('/brands', brandController.getAllBrand);
router.get('/brands/:id', brandController.getOneBrand);
router.put('/brands/:id', checkPermisstion, brandController.updateBrand);
router.delete('/brands/:id', checkPermisstion, brandController.deleteBrand);

export default router;
