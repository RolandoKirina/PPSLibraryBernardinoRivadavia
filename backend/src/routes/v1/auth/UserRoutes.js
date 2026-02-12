import express from "express";
import * as UserController from "../../../controllers/auth/UserController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", validateIdParam("User id"), UserController.getUser);

router.post("/register", UserController.createUser);

router.post("/login", UserController.loginUser);

router.put("/:id", validateIdParam("User id"), UserController.updateUser);

router.delete("/:id", validateIdParam("User id"), UserController.deleteUser);

export default router;
