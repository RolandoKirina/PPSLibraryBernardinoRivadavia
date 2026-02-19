import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as AuthorsController from '../../../controllers/author/AuthorsController.js';

import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";


const router = express.Router();

router.get('/', AuthorsController.getAllAuthors);
router.get('/:id', authorizeRoles(['admin']), validateIdParam("id"), AuthorsController.getAuthor);
router.post('/', authorizeRoles(['admin']), AuthorsController.createAuthor);
router.put('/:id', authorizeRoles(['admin']), validateIdParam("id"), AuthorsController.updateAuthor);

// quizás añadir patch
// router.patch('/:id', AuthorsController.patchAuthor);

router.delete('/:id', authorizeRoles(['admin']), validateIdParam("id"), AuthorsController.removeAuthor);

//author by name


export default router;
