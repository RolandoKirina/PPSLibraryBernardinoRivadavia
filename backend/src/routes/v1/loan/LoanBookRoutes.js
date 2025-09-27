import express from 'express';

import * as LoanBookController from '../../../controllers/loan/LoanBookController.js';

const router = express.Router();

router.get('/', LoanBookController.getAllLoanBooks);
router.get('/:id', LoanBookController.getLoanBook);
router.post('/', LoanBookController.createLoanBook);
router.put('/:id', LoanBookController.updateLoanBook);

// quizás añadir patch
// router.patch('/:id', LoanBookController.patchLoanBook);

router.delete('/:id', LoanBookController.removeLoanBook);

export default router;
