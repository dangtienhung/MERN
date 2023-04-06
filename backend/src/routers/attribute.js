import { atributeController } from '../controllers/atribute.controllers.js';
import { checkPermisstion } from '../middlewares/checkPermission.js';
import express from 'express';

const router = express.Router();

router.post('/attributes', checkPermisstion, atributeController.createAtribute);
router.get('/attributes', atributeController.readAllAtributes);
router.get('/attributes/:id', atributeController.readOneAtribute);
router.put(
	'/attributes/:id',
	checkPermisstion,
	atributeController.updateAtribute
);
router.delete(
	'/attributes/:id',
	checkPermisstion,
	atributeController.deleteAtribute
);

export default router;
