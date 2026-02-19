import express from "express";
import * as FeeController from "../../../controllers/fee/FeeController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();
router.get("/partners/:partnerId/unpaid-fees",  validateIdParam("partnerId"), FeeController.getUnpaidFeesByPartner);
router.post("/generate-unpaid-fees", FeeController.generateUnpaidFees);
router.get("/paid-count", FeeController.getPaidFeeCountByPartner);
router.get("/", FeeController.getAllFees);
router.get("/:id", validateIdParam("id"), FeeController.getFee);
router.put("/:id", validateIdParam("id"), FeeController.updateFee);
export default router;
