import express from "express";
import * as PartnerController from "../../../controllers/partner/PartnerController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", PartnerController.getAllPartners);
router.get("/:id", validateIdParam("Partner id"), PartnerController.getPartner);
router.post("/", PartnerController.createPartner);
router.put("/:id", validateIdParam("Partner id"), PartnerController.updatePartner);
router.delete("/:id", validateIdParam("Partner id"), PartnerController.removePartner);

export default router;
