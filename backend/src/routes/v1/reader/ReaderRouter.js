import express from "express";
import * as ReaderController from "../../../controllers/reader/ReaderController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", ReaderController.getAllReaders);
router.get("/:id", validateIdParam("id"), ReaderController.getReader);
router.post("/", ReaderController.createReader);
router.put("/return-book/:id", validateIdParam("id"), ReaderController.returnReaderBook);
router.put("/:id", validateIdParam("id"), ReaderController.updateReader);
router.delete("/:id", validateIdParam("id"), ReaderController.deleteReader);

export default router;
