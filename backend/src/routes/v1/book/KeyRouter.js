import express from "express";
import * as KeyController from "../../../controllers/book/KeyController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), KeyController.getAllKeys);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("Key id"), KeyController.getKey);
router.post("/", authorizeRoles(['admin']), KeyController.createKey);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("Key id"), KeyController.updateKey);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("Key id"), KeyController.deleteKey);

export default router;
