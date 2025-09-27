import express from 'express';

import * as AuthorsController from '../../../controllers/author/AuthorsController.js';

const router = express.Router();

router.get('/', AuthorsController.getAllAuthors);
router.get('/:id', AuthorsController.getAuthor);
router.post('/', AuthorsController.createAuthor);
router.put('/:id', AuthorsController.updateAuthor);

// quizás añadir patch
// router.patch('/:id', AuthorsController.patchAuthor);

router.delete('/:id', AuthorsController.removeAuthor);

export default router;
