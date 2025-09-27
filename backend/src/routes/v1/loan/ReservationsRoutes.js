import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as ReservationsController from '../../../controllers/loan/ReservationsController.js';

const router = express.Router();

router.get('/', ReservationsController.getAllReservations);
router.get('/:id', validateIdParam("reservationId"), ReservationsController.getReservation);
router.post('/', ReservationsController.createReservation);
router.put('/:id', validateIdParam("reservationId"), ReservationsController.updateReservation);

// quizás añadir patch
// router.patch('/:id', ReservationsController.patchReservation);

router.delete('/:id', validateIdParam("reservationId"), ReservationsController.removeReservation);

export default router;
