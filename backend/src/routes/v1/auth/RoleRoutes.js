import express from "express";
import * as RoleController from "../../../controllers/auth/RoleController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), RoleController.getAllRoles);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), RoleController.getRole);

router.post("/", authorizeRoles(['admin']), RoleController.createRole);

router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), RoleController.updateRole);

router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), RoleController.deleteRole);

export default router;
