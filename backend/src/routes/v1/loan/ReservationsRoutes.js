import express from 'express';

import * as ReservationsController from '../../../controllers/loan/ReservationsController.js';

const router = express.Router();

router.get('/', ReservationsController.getAllReservations);
router.get('/:id', ReservationsController.getReservation);
router.post('/', ReservationsController.createReservation);
router.put('/:id', ReservationsController.updateReservation);

// quizás añadir patch
// router.patch('/:id', ReservationsController.patchReservation);

router.delete('/:id', ReservationsController.removeReservation);

export default router;
