import express from "express";
import * as LocalityController from "../../../controllers/partner/LocalityController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from '../../../middlewares/authorizeRoles.js';

const router = express.Router();

router.get("/", authorizeRoles(['admin']), LocalityController.getAllLocalities);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), LocalityController.getLocality);
router.post("/", authorizeRoles(['admin']), LocalityController.createLocality);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), LocalityController.updateLocality);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), LocalityController.deleteLocality);

export default router;
