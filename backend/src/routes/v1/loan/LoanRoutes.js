import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as LoanController from '../../../controllers/loan/LoanController.js';

const router = express.Router();

router.get('/', LoanController.getAllLoans);
//agregue un middleware para evitar repetir codigo en la funcion validateid
//router.get("/loan/:id", validateIdParam("loan id"), getLoan);
router.get('/:id', validateIdParam("id"), LoanController.getLoan);
router.post('/', LoanController.createLoan);
router.put('/:id', validateIdParam("id"), LoanController.updateLoan);

//quizas añadir patch

router.delete('/:id', validateIdParam("id"), LoanController.removeLoan);

export default router;