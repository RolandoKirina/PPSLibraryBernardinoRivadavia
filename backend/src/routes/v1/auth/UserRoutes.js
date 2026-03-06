import express from "express";
import * as UserController from "../../../controllers/auth/UserController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), UserController.getAllUsers);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), UserController.getUser);

router.post("/register", UserController.createUser);

router.post("/login", UserController.loginUser);

router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), UserController.updateUser);

router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), UserController.deleteUser);

export default router;
