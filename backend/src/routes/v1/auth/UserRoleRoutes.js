import express from "express";
import * as UserRoleController from "../../../controllers/auth/UserRoleController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", UserRoleController.getAllUserRoles);
router.get("/:id", validateIdParam("UserRole id"), UserRoleController.getUserRole);

router.post("/", UserRoleController.createUserRole);

router.put("/:id", validateIdParam("UserRole id"), UserRoleController.updateUserRole);

router.delete("/:id", validateIdParam("UserRole id"), UserRoleController.deleteUserRole);

export default router;
