import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as LoanBookController from '../../../controllers/loan/LoanBookController.js';

const router = express.Router();

router.get('/', LoanBookController.getAllLoanBooks);
router.get('/:id', validateIdParam("loanBookId"), LoanBookController.getLoanBook);
router.post('/', LoanBookController.createLoanBook);
router.put('/:id', validateIdParam("loanBookId"), LoanBookController.updateLoanBook);

// quizás añadir patch
// router.patch('/:id', LoanBookController.patchLoanBook);

router.delete('/:id', validateIdParam("loanBookId"), LoanBookController.removeLoanBook);

export default router;
