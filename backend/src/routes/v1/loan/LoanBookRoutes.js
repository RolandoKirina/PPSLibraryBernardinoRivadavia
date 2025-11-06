import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as LoanBookController from '../../../controllers/loan/LoanBookController.js';

const router = express.Router();

router.get('/', LoanBookController.getAllLoanBooks);

router.get('/repeated-book/:id', LoanBookController.verifyIfBookIsNotRepeated);

router.get('/:id', validateIdParam("id"), LoanBookController.getLoanBook);
router.post('/', LoanBookController.createLoanBook);
router.put('/:id', validateIdParam("id"), LoanBookController.updateLoanBook);

// quizás añadir patch
// router.patch('/:id', LoanBookController.patchLoanBook);

router.delete('/:id', validateIdParam("id"), LoanBookController.removeLoanBook);

export default router;
