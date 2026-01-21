import express from 'express';
import * as EmployeesController from '../../../controllers/options/EmployeesController.js';
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get('/', EmployeesController.getAllEmployees);
router.get('/by-code/:code', EmployeesController.getOneByCode);
router.get('/:id', validateIdParam("id"), EmployeesController.getEmployee);
router.post('/', EmployeesController.createEmployee);
router.put('/:id', validateIdParam("id"), EmployeesController.updateEmployee);
router.delete('/:id', validateIdParam("id"), EmployeesController.removeEmployee);

export default router;
