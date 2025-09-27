import express from 'express';
import * as BookTypeGroupController from '../../../controllers/options/BookTypeGroupController.js';

const router = express.Router();

router.get('/', BookTypeGroupController.getAllBookTypeGroups);
router.get('/:id', BookTypeGroupController.getBookTypeGroup);
router.post('/', BookTypeGroupController.createBookTypeGroup);
router.put('/:id', BookTypeGroupController.updateBookTypeGroup);
router.delete('/:id', BookTypeGroupController.removeBookTypeGroup);

export default router;
