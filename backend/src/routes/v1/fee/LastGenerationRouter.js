import express from "express";
import * as LastGenerationController from "../../../controllers/lastGeneration/LastGenerationController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", LastGenerationController.getAllLastGenerations);
router.get("/:id", validateIdParam("LastGeneration id"), LastGenerationController.getLastGeneration);

router.post("/", LastGenerationController.createLastGeneration);

router.put("/:id", validateIdParam("LastGeneration id"), LastGenerationController.updateLastGeneration);

router.delete("/:id", validateIdParam("LastGeneration id"), LastGenerationController.deleteLastGeneration);

export default router;
