import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as AuthorsController from '../../../controllers/author/AuthorsController.js';

const router = express.Router();

router.get('/', AuthorsController.getAllAuthors);
router.get('/count', AuthorsController.getCount);
router.get('/:id', validateIdParam("id"), AuthorsController.getAuthor);
router.post('/', AuthorsController.createAuthor);
router.put('/:id', validateIdParam("id"), AuthorsController.updateAuthor);

// quizás añadir patch
// router.patch('/:id', AuthorsController.patchAuthor);

router.delete('/:id', validateIdParam("id"), AuthorsController.removeAuthor);

//author by name


export default router;
