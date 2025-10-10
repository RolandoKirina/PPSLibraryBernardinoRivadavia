import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";
import * as BookAuthorController from '../../../controllers/author/BookAuthorController.js';

const router = express.Router();

router.get('/', BookAuthorController.getAllBookAuthors);
router.get('/:id', validateIdParam("bookAuthorId"), BookAuthorController.getBookAuthor);
router.post('/', BookAuthorController.createBookAuthor);
router.put('/:id', validateIdParam("bookAuthorId"), BookAuthorController.updateBookAuthor);

// quizás añadir patch
// router.patch('/:id', BookAuthorController.patchBookAuthor);

router.delete('/:id', validateIdParam("bookAuthorId"), BookAuthorController.removeBookAuthorById);

router.delete('/book/:bookId/author/:authorCode', 
  validateIdParam("authorCode"), 
  validateIdParam("bookId"), 
  BookAuthorController.removeBookAuthor
);



export default router;
