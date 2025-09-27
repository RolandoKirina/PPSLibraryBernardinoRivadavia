import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as LoanTypeController from '../../../controllers/loan/LoanTypeController.js';

const router = express.Router();

router.get('/', LoanTypeController.getAllLoanTypes);
router.get('/:id', validateIdParam("loanTypeId"), LoanTypeController.getLoanType);
router.post('/', LoanTypeController.createLoanType);
router.put('/:id', validateIdParam("loanTypeId"), LoanTypeController.updateLoanType);

// quizás añadir patch
// router.patch('/:id', LoanTypeController.patchLoanType);

router.delete('/:id', validateIdParam("loanTypeId"), LoanTypeController.removeLoanType);

export default router;
