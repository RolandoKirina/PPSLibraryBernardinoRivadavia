import express from "express";
import * as SignController from "../../../controllers/book/SignController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), SignController.getAllSigns);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("Sign id"), SignController.getSign);
router.post("/", authorizeRoles(['admin']), SignController.createSign);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("Sign id"), SignController.updateSign);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("Sign id"), SignController.deleteSign);

export default router;
