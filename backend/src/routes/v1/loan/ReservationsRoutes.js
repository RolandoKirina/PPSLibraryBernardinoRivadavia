import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as ReservationsController from '../../../controllers/loan/ReservationsController.js';

const router = express.Router();

router.get('/', ReservationsController.getAllReservations);
router.get('/:id', validateIdParam("id"), ReservationsController.getReservation);
router.post('/', ReservationsController.createReservation);
router.put('/:id', validateIdParam("id"), ReservationsController.updateReservation);

// quizás añadir patch
// router.patch('/:id', ReservationsController.patchReservation);

router.delete('/:id', validateIdParam("id"), ReservationsController.removeReservation);

export default router;
