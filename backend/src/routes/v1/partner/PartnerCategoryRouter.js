import express from "express";
import * as PartnerCategoryController from "../../../controllers/partner/PartnerCategoryController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), PartnerCategoryController.getAllPartnerCategories);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerCategoryController.getPartnerCategory);
router.post("/", authorizeRoles(['admin']), PartnerCategoryController.createPartnerCategory);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerCategoryController.updatePartnerCategory);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), PartnerCategoryController.deletePartnerCategory);

export default router;
