import express from "express";
import * as MaritalStatusController from "../../../controllers/partner/MaritalStatusController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), MaritalStatusController.getAllMaritalStatuses);

export default router;
