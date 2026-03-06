import express from "express";
import * as FeeController from "../../../controllers/fee/FeeController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();
router.get("/partners/:partnerId/unpaid-fees",  authorizeRoles(['admin']), validateIdParam("partnerId"), FeeController.getUnpaidFeesByPartner);
router.post("/generate-unpaid-fees", authorizeRoles(['admin']), FeeController.generateUnpaidFees);
router.get("/paid-count", authorizeRoles(['admin']), FeeController.getPaidFeeCountByPartner);
router.get("/", authorizeRoles(['admin', 'partner']), FeeController.getAllFees);
router.get("/:id", authorizeRoles(['admin', 'partner']), validateIdParam("id"), FeeController.getFee);
router.post("/", authorizeRoles(['admin']), FeeController.createFee);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), FeeController.updateFee);
// router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), FeeController.deleteFee);
export default router;
