import express from "express";
import * as PartnerCategoryController from "../../../controllers/partner/PartnerCategoryController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", PartnerCategoryController.getAllPartnerCategories);
router.get("/count", PartnerCategoryController.getCount);
router.get("/:id", validateIdParam("id"), PartnerCategoryController.getPartnerCategory);
router.post("/", PartnerCategoryController.createPartnerCategory);
router.put("/:id", validateIdParam("id"), PartnerCategoryController.updatePartnerCategory);
router.delete("/:id", validateIdParam("id"), PartnerCategoryController.deletePartnerCategory);

export default router;
