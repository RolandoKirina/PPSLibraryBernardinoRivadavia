import express from "express";
import * as FeeController from "../../../controllers/fee/FeeController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();
router.get("/partners/:partnerId/unpaid-fees",  validateIdParam("partnerId"), FeeController.getUnpaidFeesByPartner);
router.post("/generate-unpaid-fees", FeeController.generateUnpaidFees);
router.get("/paid-count", FeeController.getPaidFeeCountByPartner);
router.get("/", FeeController.getAllFees);
router.get("/count", FeeController.getCount);
router.get("/:id", validateIdParam("id"), FeeController.getFee);
router.post("/", FeeController.createFee);
router.put("/:id", validateIdParam("id"), FeeController.updateFee);
router.delete("/:id", validateIdParam("id"), FeeController.deleteFee);
export default router;
