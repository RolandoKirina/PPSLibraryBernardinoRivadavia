import express from "express";
import * as FeeController from "../../../controllers/fee/FeeController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", FeeController.getAllFees);
router.get("/:id", validateIdParam("Fee id"), FeeController.getFee);
router.post("/", FeeController.createFee);
router.put("/:id", validateIdParam("Fee id"), FeeController.updateFee);
router.delete("/:id", validateIdParam("Fee id"), FeeController.deleteFee);

export default router;
