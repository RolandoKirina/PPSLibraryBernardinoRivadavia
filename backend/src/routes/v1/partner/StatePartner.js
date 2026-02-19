import express from "express";
import * as StatePartnerController from "../../../controllers/partner/StatePartnerController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), StatePartnerController.getAllStatePartners);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), StatePartnerController.getStatePartner);
router.post("/", authorizeRoles(['admin']), StatePartnerController.createStatePartner);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), StatePartnerController.updateStatePartner);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), StatePartnerController.deleteStatePartner);

export default router;
