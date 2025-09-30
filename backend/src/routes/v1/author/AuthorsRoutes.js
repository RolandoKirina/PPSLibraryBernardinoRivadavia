import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as AuthorsController from '../../../controllers/author/AuthorsController.js';

const router = express.Router();

router.get('/', AuthorsController.getAllAuthors);
router.get('/:id', validateIdParam("authorId"), AuthorsController.getAuthor);
router.get('/by-name/:name', AuthorsController.getAllAuthorsByName);
router.post('/', AuthorsController.createAuthor);
router.put('/:id', validateIdParam("authorId"), AuthorsController.updateAuthor);

// quizás añadir patch
// router.patch('/:id', AuthorsController.patchAuthor);

router.delete('/:id', validateIdParam("authorId"), AuthorsController.removeAuthor);

//author by name


export default router;
