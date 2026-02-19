import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";
import * as BookAuthorController from '../../../controllers/author/BookAuthorController.js';
import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['admin']), BookAuthorController.getAllBookAuthors);
router.get('/:id', authorizeRoles(['admin']), validateIdParam("id"), BookAuthorController.getBookAuthor);
router.post('/', authorizeRoles(['admin']), BookAuthorController.createBookAuthor);
router.put('/:id', authorizeRoles(['admin']), validateIdParam("id"), BookAuthorController.updateBookAuthor);

router.delete('/deleteAllOfAuthor/:id', authorizeRoles(['admin']), validateIdParam("id"), BookAuthorController.removeBooksOfAuthor);


// quizás añadir patch
// router.patch('/:id', BookAuthorController.patchBookAuthor);

router.delete('/:id', authorizeRoles(['admin']), validateIdParam("id"), BookAuthorController.removeBookAuthorById);

router.delete('/book/:bookId/author/:authorCode',
  authorizeRoles(['admin']),  
  validateIdParam("authorCode"), 
  validateIdParam("bookId"), 
  BookAuthorController.removeBookAuthor
);



export default router;
