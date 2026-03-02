import express from "express";
import * as UserRoleController from "../../../controllers/auth/UserRoleController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), UserRoleController.getAllUserRoles);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), UserRoleController.getUserRole);

router.post("/", authorizeRoles(['admin']), UserRoleController.createUserRole);

router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), UserRoleController.updateUserRole);

router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), UserRoleController.deleteUserRole);

export default router;
