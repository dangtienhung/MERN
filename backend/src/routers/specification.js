import { checkPermisstion } from '../middlewares/checkPermission.js';
import express from 'express';
import { specificationControllers } from '../controllers/specifications.controller.js';

const router = express.Router();

router.post(
	'/specifications',
	checkPermisstion,
	specificationControllers.createSpecification
);
router.get('/specifications', specificationControllers.getAllSpecifications);
router.get('/specifications/:id', specificationControllers.getOneSpecification);
router.put(
	'/specifications/:id',
	checkPermisstion,
	specificationControllers.updateSpecification
);
router.delete(
	'/specifications/:id',
	checkPermisstion,
	specificationControllers.deleteSpecification
);

export default router;
