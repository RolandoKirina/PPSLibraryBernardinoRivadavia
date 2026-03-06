import express from "express";
import * as LastGenerationController from "../../../controllers/fee/LastGenerationController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), LastGenerationController.getAllLastGenerations);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("LastGeneration id"), LastGenerationController.getLastGeneration);

router.post("/", authorizeRoles(['admin']), LastGenerationController.createLastGeneration);

router.put("/:id", authorizeRoles(['admin']), validateIdParam("LastGeneration id"), LastGenerationController.updateLastGeneration);

router.delete("/:id", authorizeRoles(['admin']), validateIdParam("LastGeneration id"), LastGenerationController.deleteLastGeneration);

export default router;
