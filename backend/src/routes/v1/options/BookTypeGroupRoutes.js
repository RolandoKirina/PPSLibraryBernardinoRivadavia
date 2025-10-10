import express from 'express';
import * as BookTypeGroupController from '../../../controllers/options/BookTypeGroupController.js';
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get('/', BookTypeGroupController.getAllBookTypeGroups);
router.get('/:id', BookTypeGroupController.getBookTypeGroup);
router.post('/', BookTypeGroupController.createBookTypeGroup);
router.put('/:id', BookTypeGroupController.updateBookTypeGroup);
router.delete('/:id', BookTypeGroupController.removeBookTypeGroupById);

router.delete('/book-type/:bookTypeId/group-list/:groupListId', 
  validateIdParam("bookTypeId"), 
  validateIdParam("groupListId"), 
  BookTypeGroupController.removeBookTypeGroup
);

export default router;
