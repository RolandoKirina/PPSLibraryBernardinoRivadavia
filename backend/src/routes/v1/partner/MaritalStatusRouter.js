import express from "express";
import * as MaritalStatusController from "../../../controllers/partner/MaritalStatusController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", MaritalStatusController.getAllMaritalStatuses);

export default router;
