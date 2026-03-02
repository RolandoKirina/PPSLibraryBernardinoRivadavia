import express from "express";
import * as ReasonForWithdrawalController from "../../../controllers/partner/ReasonForWithdrawalController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), ReasonForWithdrawalController.getAllReasonsForWithdrawal);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), ReasonForWithdrawalController.getReasonForWithdrawal);
router.post("/", authorizeRoles(['admin']), ReasonForWithdrawalController.createReasonForWithdrawal);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), ReasonForWithdrawalController.updateReasonForWithdrawal);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), ReasonForWithdrawalController.deleteReasonForWithdrawal);

export default router;
