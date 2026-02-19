import express from "express";
import * as BookTypeController from "../../../controllers/options/BookTypeController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), BookTypeController.getAllBookTypes);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), BookTypeController.getBookType);
router.post("/", authorizeRoles(['admin']), BookTypeController.createBookType);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), BookTypeController.updateBookType);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), BookTypeController.deleteBookType);

export default router;
