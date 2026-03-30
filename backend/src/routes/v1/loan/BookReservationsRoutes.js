import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as BookReservationsController from '../../../controllers/loan/BookReservationsController.js';

import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['admin']), BookReservationsController.getAllBookReservations);
router.get('/:id', authorizeRoles(['admin']), validateIdParam("bookReservationId"), BookReservationsController.getBookReservation);
router.post('/', authorizeRoles(['admin']), BookReservationsController.createBookReservation);
router.put('/:id', authorizeRoles(['admin']), validateIdParam("bookReservationId"), BookReservationsController.updateBookReservation);
router.delete('/:id', authorizeRoles(['admin']), validateIdParam("bookReservationId"), BookReservationsController.removeBookReservation);

export default router;
