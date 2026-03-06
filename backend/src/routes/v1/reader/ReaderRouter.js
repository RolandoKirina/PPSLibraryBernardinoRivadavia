import express from "express";
import * as ReaderController from "../../../controllers/reader/ReaderController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), ReaderController.getAllReaders);
router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), ReaderController.getReader);
router.post("/", authorizeRoles(['admin']), ReaderController.createReader);
router.put("/return-book/:id", authorizeRoles(['admin']), validateIdParam("id"), ReaderController.returnReaderBook);
router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), ReaderController.updateReader);
router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), ReaderController.deleteReader);

export default router;
