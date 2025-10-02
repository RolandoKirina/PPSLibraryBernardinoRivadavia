import express from "express";
import * as ReasonForWithdrawalController from "../../../controllers/partner/ReasonForWithdrawalController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", ReasonForWithdrawalController.getAllReasonsForWithdrawal);
router.get("/:id", validateIdParam("ReasonForWithdrawal id"), ReasonForWithdrawalController.getReasonForWithdrawal);
router.post("/", ReasonForWithdrawalController.createReasonForWithdrawal);
router.put("/:id", validateIdParam("ReasonForWithdrawal id"), ReasonForWithdrawalController.updateReasonForWithdrawal);
router.delete("/:id", validateIdParam("ReasonForWithdrawal id"), ReasonForWithdrawalController.deleteReasonForWithdrawal);

export default router;
