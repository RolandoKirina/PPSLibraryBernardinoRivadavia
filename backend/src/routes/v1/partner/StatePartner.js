import express from "express";
import * as StatePartnerController from "../../../controllers/partner/StatePartnerController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", StatePartnerController.getAllStatePartners);
router.get("/:id", validateIdParam("StatePartner id"), StatePartnerController.getStatePartner);
router.post("/", StatePartnerController.createStatePartner);
router.put("/:id", validateIdParam("StatePartner id"), StatePartnerController.updateStatePartner);
router.delete("/:id", validateIdParam("StatePartner id"), StatePartnerController.deleteStatePartner);

export default router;
