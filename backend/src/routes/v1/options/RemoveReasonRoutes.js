import express from 'express';
import * as RemoveReasonController from '../../../controllers/options/RemoveReasonController.js';
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['admin']), RemoveReasonController.getAllRemoveReasons);
router.get('/:id', authorizeRoles(['admin']), validateIdParam("id"), RemoveReasonController.getRemoveReason);
router.post('/', authorizeRoles(['admin']), RemoveReasonController.createRemoveReason);
router.put('/:id', authorizeRoles(['admin']), validateIdParam("id"), RemoveReasonController.updateRemoveReason);
router.delete('/:id', authorizeRoles(['admin']), validateIdParam("id"), RemoveReasonController.removeRemoveReason);

export default router;
