import express from 'express';

import * as BookAuthorController from '../../../controllers/author/BookAuthorController.js';

const router = express.Router();

router.get('/', BookAuthorController.getAllBookAuthors);
router.get('/:id', BookAuthorController.getBookAuthor);
router.post('/', BookAuthorController.createBookAuthor);
router.put('/:id', BookAuthorController.updateBookAuthor);

// quizás añadir patch
// router.patch('/:id', BookAuthorController.patchBookAuthor);

router.delete('/:id', BookAuthorController.removeBookAuthor);

export default router;
