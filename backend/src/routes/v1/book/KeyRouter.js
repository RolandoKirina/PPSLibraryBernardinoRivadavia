import express from "express";
import * as KeyController from "../../../controllers/book/KeyController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", KeyController.getAllKeys);
router.get("/:id", validateIdParam("Key id"), KeyController.getKey);
router.post("/", KeyController.createKey);
router.put("/:id", validateIdParam("Key id"), KeyController.updateKey);
router.delete("/:id", validateIdParam("Key id"), KeyController.deleteKey);

export default router;
