import express from 'express';

import * as LoanTypeController from '../../../controllers/loan/LoanTypeController.js';

const router = express.Router();

router.get('/', LoanTypeController.getAllLoanTypes);
router.get('/:id', LoanTypeController.getLoanType);
router.post('/', LoanTypeController.createLoanType);
router.put('/:id', LoanTypeController.updateLoanType);

// quizás añadir patch
// router.patch('/:id', LoanTypeController.patchLoanType);

router.delete('/:id', LoanTypeController.removeLoanType);

export default router;
