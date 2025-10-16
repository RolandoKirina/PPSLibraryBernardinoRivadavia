import express from 'express';
import * as BookTypeGroupListController from '../../../controllers/options/BookTypeGroupListController.js';
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get('/', BookTypeGroupListController.getAllBookTypeGroupLists);
router.get('/lastId', BookTypeGroupListController.getLastBookTypeGroupListId);
router.get('/:id', BookTypeGroupListController.getBookTypeGroupList);
router.post('/', BookTypeGroupListController.createBookTypeGroupList);
router.put('/:id', BookTypeGroupListController.updateBookTypeGroupList);
router.delete('/:id', BookTypeGroupListController.removeBookTypeGroupList);

export default router;
