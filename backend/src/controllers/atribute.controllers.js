import { AtributeValidation } from '../validate/atribute.validate.js';
import Attribute from '../models/attribute.model.js';
import Specification from '../models/specifications.model.js';

// Create and Save a new Attribute
export const atributeController = {
	/* create */
	createAtribute: async (req, res) => {
		try {
			const body = req.body;
			const { error } = AtributeValidation.validate(body, {
				abortEarly: false,
			});
			if (error) {
				return res.status(400).json({
					message: error.details.map((x) => x.message).join(', '),
				});
			}
			const atribute = await Attribute.create(body);
			if (!atribute) {
				return res.status(400).json({
					message: 'Atribute not created',
				});
			}
			/* update specification */
			await Specification.findByIdAndUpdate(atribute.specificationId, {
				$addToSet: { attributes: atribute._id },
			});
			return res.status(201).json({
				message: 'Atribute created successfully',
				atribute,
			});
		} catch (error) {
			return res.status(500).json({
				message:
					error.message || 'Something went wrong while creating atribute',
			});
		}
	},
	/* read all */
	readAllAtributes: async (req, res) => {
		try {
			const atributes = await Attribute.find();
			if (!atributes) {
				return res.status(400).json({
					message: 'Atributes not found',
				});
			}
			return res.status(200).json({
				message: 'Atributes found successfully',
				atributes,
			});
		} catch (error) {
			return res.status(500).json({
				message:
					error.message || 'Something went wrong while reading atributes',
			});
		}
	},
	/* read one */
	readOneAtribute: async (req, res) => {
		try {
			/* read */
			const atribute = await Attribute.findById(req.params.id).populate(
				'specificationId'
			);
			if (!atribute) {
				return res.status(400).json({
					message: 'Atribute not found',
				});
			}
			return res.status(200).json({
				message: 'Atribute found successfully',
				atribute,
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message || 'Something went wrong while reading atribute',
			});
		}
	},
	/* update */
	updateAtribute: async (req, res) => {
		try {
			const body = req.body;
			const { error } = AtributeValidation.validate(body, {
				abortEarly: false,
			});
			if (error) {
				return res.status(400).json({
					message: error.details.map((x) => x.message).join(', '),
				});
			}
			/* update */
			const attribute = await Attribute.findByIdAndUpdate(req.params.id, body, {
				new: true,
			});
			if (!attribute) {
				return res.status(400).json({ message: 'Atribute not updated' });
			}
			return res.status(200).json({
				message: 'Atribute updated successfully',
				attribute,
			});
		} catch (error) {
			return res.status(500).json({
				message:
					error.message || 'Something went wrong while updating atribute',
			});
		}
	},
	/* delete */
	deleteAtribute: async (req, res) => {
		try {
			/* delete */
			const atribute = await Attribute.findByIdAndDelete(req.params.id);
			if (!atribute) {
				return res.status(400).json({ message: 'Atribute not deleted' });
			}
			return res.status(200).json({
				message: 'Atribute deleted successfully',
				atribute,
			});
		} catch (error) {
			return res.status(500).json({
				message:
					error.message || 'Something went wrong while deleting atribute',
			});
		}
	},
};
