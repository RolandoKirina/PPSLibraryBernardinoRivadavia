import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as LoanBookController from '../../../controllers/loan/LoanBookController.js';
import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['admin']), LoanBookController.getAllLoanBooks);

router.get('/repeated-book/:id', authorizeRoles(['admin']), LoanBookController.verifyIfBookIsNotRepeated);

router.get('/:id', authorizeRoles(['admin']), validateIdParam("id"), LoanBookController.getLoanBook);
router.post('/', authorizeRoles(['admin']), LoanBookController.createLoanBook);
router.put('/:id', authorizeRoles(['admin']), validateIdParam("id"), LoanBookController.updateLoanBook);

router.delete('/:id', authorizeRoles(['admin']), validateIdParam("id"), LoanBookController.removeLoanBook);

export default router;
