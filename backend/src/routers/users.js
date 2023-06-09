import { authControllers } from '../controllers/auth.controllers.js';
import { checkPermisstion } from '../middlewares/checkPermission.js';
import express from 'express';
import { userControllers } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/users', checkPermisstion, authControllers.getAllUsers);
router.delete('/users/:id', checkPermisstion, authControllers.deleteUser);
// router.put('/users/:id', checkPermisstion, authControllers.)

export default router;
