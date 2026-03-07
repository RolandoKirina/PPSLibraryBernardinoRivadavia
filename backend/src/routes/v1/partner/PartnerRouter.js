import express from "express";
import * as PartnerController from "../../../controllers/partner/PartnerController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), PartnerController.getAllPartners);
router.get("/printlist", authorizeRoles(['admin']), PartnerController.printList)

router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerController.getPartner);
router.get("/partner-number/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerController.getOneByPartnerNumber);
router.post("/", authorizeRoles(['admin']), PartnerController.createPartner);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerController.updatePartner);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerController.removePartner);

export default router;
