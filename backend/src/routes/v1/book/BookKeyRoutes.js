import express from "express";
import * as BookKeyController from "../../../controllers/book/BookKeyController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), BookKeyController.getAllBookKeys);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("BookKey id"), BookKeyController.getBookKey);
router.post("/", authorizeRoles(['admin']), BookKeyController.createBookKey);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("BookKey id"), BookKeyController.updateBookKey);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("BookKey id"), BookKeyController.deleteBookKey);

export default router;
