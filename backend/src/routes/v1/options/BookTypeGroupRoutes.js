import express from 'express';
import * as BookTypeGroupController from '../../../controllers/options/BookTypeGroupController.js';
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get('/', BookTypeGroupController.getAllBookTypeGroups);
router.put('/groupId/:id', BookTypeGroupController.updateBookTypesInGroup);
router.get('/:id', validateIdParam("id"), BookTypeGroupController.getBookTypeGroup);
router.post('/', validateIdParam("id"), BookTypeGroupController.createBookTypeGroup);
router.put('/:id', validateIdParam("id"), BookTypeGroupController.updateBookTypeGroup);
router.delete('/:id', validateIdParam("id"), BookTypeGroupController.removeBookTypeGroupById);

router.delete('/book-type/:bookTypeId/group-list/:groupListId', 
  validateIdParam("bookTypeId"), 
  validateIdParam("groupListId"), 
  BookTypeGroupController.removeBookTypeGroup
);

export default router;
