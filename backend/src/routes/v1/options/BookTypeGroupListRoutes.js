import express from 'express';
import * as BookTypeGroupListController from '../../../controllers/options/BookTypeGroupListController.js';
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['admin']), BookTypeGroupListController.getAllBookTypeGroupLists);
router.get('/:id', authorizeRoles(['admin']), BookTypeGroupListController.getBookTypeGroupList);
router.post('/', authorizeRoles(['admin']), BookTypeGroupListController.createBookTypeGroupList);
router.put('/:id', authorizeRoles(['admin']), BookTypeGroupListController.updateBookTypeGroupList);
router.delete('/:id', authorizeRoles(['admin']), BookTypeGroupListController.removeBookTypeGroupList);

export default router;
