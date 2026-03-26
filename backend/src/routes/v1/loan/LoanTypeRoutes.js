import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";

import * as LoanTypeController from '../../../controllers/loan/LoanTypeController.js';

import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['admin']), LoanTypeController.getAllLoanTypes);
router.get('/:id', authorizeRoles(['admin']), validateIdParam("loanTypeId"), LoanTypeController.getLoanType);
router.post('/', authorizeRoles(['admin']), LoanTypeController.createLoanType);
router.put('/:id', authorizeRoles(['admin']), validateIdParam("loanTypeId"), LoanTypeController.updateLoanType);

router.delete('/:id', authorizeRoles(['admin']), validateIdParam("loanTypeId"), LoanTypeController.removeLoanType);

export default router;
