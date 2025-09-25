import express from 'express';

import * as BookReservationsController from '../../../controllers/loan/BookReservationsController.js';

const router = express.Router();

router.get('/', BookReservationsController.getAllBookReservations);
router.get('/:id', BookReservationsController.getBookReservation);
router.post('/', BookReservationsController.createBookReservation);
router.put('/:id', BookReservationsController.updateBookReservation);

// quizás añadir patch
// router.patch('/:id', BookReservationsController.patchBookReservation);

router.delete('/:id', BookReservationsController.removeBookReservation);

export default router;
