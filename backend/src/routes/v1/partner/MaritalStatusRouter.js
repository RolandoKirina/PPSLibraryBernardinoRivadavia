import express from "express";
import * as MaritalStatusController from "../../../controllers/partner/MaritalStatusController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", MaritalStatusController.getAllMaritalStatuses);
router.get("/:id", validateIdParam("MaritalStatus id"), MaritalStatusController.getMaritalStatus);
router.post("/", MaritalStatusController.createMaritalStatus);
router.put("/:id", validateIdParam("MaritalStatus id"), MaritalStatusController.updateMaritalStatus);
router.delete("/:id", validateIdParam("MaritalStatus id"), MaritalStatusController.deleteMaritalStatus);

export default router;
