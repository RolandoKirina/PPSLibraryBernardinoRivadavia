import express from "express";
import * as PartnerController from "../../../controllers/partner/PartnerController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();
<<<<<<< HEAD
router.get("/printlist", PartnerController.printList)
router.get("/", PartnerController.getAllPartners);
router.get("/:id", validateIdParam("id"), PartnerController.getPartner);
router.get("/partner-number/:id", validateIdParam("id"), PartnerController.getOneByPartnerNumber);
router.post("/", PartnerController.createPartner);
router.put("/:id", validateIdParam("id"), PartnerController.updatePartner);
router.delete("/:id", validateIdParam("id"), PartnerController.removePartner);
=======

router.get("/", authorizeRoles(['admin']), PartnerController.getAllPartners);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerController.getPartner);
router.get("/printlist", PartnerController.printList)
router.get("/partner-number/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerController.getOneByPartnerNumber);
router.post("/", authorizeRoles(['admin']), PartnerController.createPartner);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerController.updatePartner);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerController.removePartner);
>>>>>>> e08f362729f00884d7565e425a35058c22e5868e

export default router;
