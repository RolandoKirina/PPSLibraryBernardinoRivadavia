import express from "express";
import * as RoleController from "../../../controllers/auth/RoleController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", RoleController.getAllRoles);
router.get("/:id", validateIdParam("Role id"), RoleController.getRole);

router.post("/", RoleController.createRole);

router.put("/:id", validateIdParam("Role id"), RoleController.updateRole);

router.delete("/:id", validateIdParam("Role id"), RoleController.deleteRole);

export default router;
