import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as ReservationsController from '../../../controllers/loan/ReservationsController.js';

import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['admin']), ReservationsController.getAllReservations);
router.get('/:id', authorizeRoles(['admin']), validateIdParam("id"), ReservationsController.getReservation);
router.post('/', authorizeRoles(['admin']), ReservationsController.createReservation);
router.put('/:id', authorizeRoles(['admin']), validateIdParam("id"), ReservationsController.updateReservation);
router.delete('/:id', authorizeRoles(['admin']), validateIdParam("id"), ReservationsController.removeReservation);

export default router;
