import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as BookReservationsController from '../../../controllers/loan/BookReservationsController.js';

const router = express.Router();

router.get('/', BookReservationsController.getAllBookReservations);
router.get('/:id', validateIdParam("bookReservationId"), BookReservationsController.getBookReservation);
router.post('/', BookReservationsController.createBookReservation);
router.put('/:id', validateIdParam("bookReservationId"), BookReservationsController.updateBookReservation);

// quizás añadir patch
// router.patch('/:id', BookReservationsController.patchBookReservation);

router.delete('/:id', validateIdParam("bookReservationId"), BookReservationsController.removeBookReservation);

export default router;
