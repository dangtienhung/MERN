import { cartController } from '../controllers/cart.controllers.js';
import express from 'express';

const router = express.Router();

router.post('/carts', cartController.createCart);
router.get('/carts', cartController.getAllCart);
router.get('/carts/:id', cartController.getOneCart);
router.delete('/carts/:id', cartController.deleteCart);

export default router;
