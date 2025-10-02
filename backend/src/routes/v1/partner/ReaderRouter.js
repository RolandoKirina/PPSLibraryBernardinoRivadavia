import express from "express";
import * as ReaderController from "../../../controllers/partner/ReaderController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", ReaderController.getAllReaders);
router.get("/:id", validateIdParam("Reader id"), ReaderController.getReader);
router.post("/", ReaderController.createReader);
router.put("/:id", validateIdParam("Reader id"), ReaderController.updateReader);
router.delete("/:id", validateIdParam("Reader id"), ReaderController.deleteReader);

export default router;
