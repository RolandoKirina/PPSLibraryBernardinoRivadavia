import express from 'express';
import * as EmployeesController from '../../../controllers/options/EmployeesController.js';
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

const router = express.Router();

router.get('/', authorizeRoles(['admin']), EmployeesController.getAllEmployees);
router.get('/by-code/:code', authorizeRoles(['admin']), EmployeesController.getOneByCode);
router.get('/:id', authorizeRoles(['admin']), validateIdParam("id"), EmployeesController.getEmployee);
router.post('/', authorizeRoles(['admin']), EmployeesController.createEmployee);
router.put('/:id', authorizeRoles(['admin']), validateIdParam("id"), EmployeesController.updateEmployee);
router.delete('/:id', authorizeRoles(['admin']), validateIdParam("id"), EmployeesController.removeEmployee);

export default router;
