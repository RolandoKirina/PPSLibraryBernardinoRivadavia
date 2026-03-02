import express from 'express';
import * as BookTypeGroupController from '../../../controllers/options/BookTypeGroupController.js';
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['admin']), BookTypeGroupController.getAllBookTypeGroups);
router.put('/groupId/:id', authorizeRoles(['admin']), BookTypeGroupController.updateBookTypesInGroup);
router.get('/:id', authorizeRoles(['admin']), validateIdParam("id"), BookTypeGroupController.getBookTypeGroup);
router.post('/', authorizeRoles(['admin']), validateIdParam("id"), BookTypeGroupController.createBookTypeGroup);
router.put('/:id', authorizeRoles(['admin']), validateIdParam("id"), BookTypeGroupController.updateBookTypeGroup);
router.delete('/:id', authorizeRoles(['admin']), validateIdParam("id"), BookTypeGroupController.removeBookTypeGroupById);

router.delete('/book-type/:bookTypeId/group-list/:groupListId',
  authorizeRoles(['admin']),
  validateIdParam("bookTypeId"),
  validateIdParam("groupListId"),
  BookTypeGroupController.removeBookTypeGroup
);

export default router;
