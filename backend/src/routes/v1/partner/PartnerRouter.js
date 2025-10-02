import express from "express";
import * as LocalityController from "../../../controllers/locality/LocalityController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", LocalityController.getAllLocalities);
router.get("/:id", validateIdParam("Locality id"), LocalityController.getLocality);
router.post("/", LocalityController.createLocality);
router.put("/:id", validateIdParam("Locality id"), LocalityController.updateLocality);
router.delete("/:id", validateIdParam("Locality id"), LocalityController.deleteLocality);

export default router;
