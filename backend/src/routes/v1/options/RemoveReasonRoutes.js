import express from 'express';
import * as RemoveReasonController from '../../../controllers/options/RemoveReasonController.js';

const router = express.Router();

router.get('/', RemoveReasonController.getAllRemoveReasons);
router.get('/:id', RemoveReasonController.getRemoveReason);
router.post('/', RemoveReasonController.createRemoveReason);
router.put('/:id', RemoveReasonController.updateRemoveReason);
router.delete('/:id', RemoveReasonController.removeRemoveReason);

export default router;
