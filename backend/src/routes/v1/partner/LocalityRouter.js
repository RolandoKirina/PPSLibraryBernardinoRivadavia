import express from "express";
import * as LocalityController from "../../../controllers/partner/LocalityController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", LocalityController.getAllLocalities);
router.get("/:id", validateIdParam("id"), LocalityController.getLocality);
router.post("/", LocalityController.createLocality);
router.put("/:id", validateIdParam("id"), LocalityController.updateLocality);
router.delete("/:id", validateIdParam("id"), LocalityController.deleteLocality);

export default router;
