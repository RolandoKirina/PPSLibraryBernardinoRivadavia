import express from 'express';
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

import * as LoanController from '../../../controllers/loan/LoanController.js';

const router = express.Router();

router.get('/', authorizeRoles(['admin', 'partner']), LoanController.getAllLoans);
router.get('/employee-count', authorizeRoles(['admin']), LoanController.getLoansByEmployeeCount);
router.get('/print-list/:option', authorizeRoles(['admin']), LoanController.getLoanPrintList);
router.get('/returns',  authorizeRoles(['admin']), LoanController.getAllReturns);

router.get('/:id',  authorizeRoles(['admin', 'partner']), validateIdParam("id"), LoanController.getLoan);
router.post('/',  authorizeRoles(['admin']), LoanController.createLoan);
router.put('/:id',  authorizeRoles(['admin']), validateIdParam("id"), LoanController.updateLoan);

router.delete('/:id', authorizeRoles(['admin']), validateIdParam("id"), LoanController.removeLoan);







export default router;