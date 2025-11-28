import express from "express";
import * as ReaderBookController from "../../../controllers/reader/ReaderBookController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", ReaderBookController.getAllReaderBooks);

router.get("/:id", validateIdParam("id"), ReaderBookController.getReaderBook);

router.get('/repeated-book/:id', ReaderBookController.verifyIfBookIsNotRepeated);

router.post("/", ReaderBookController.createReaderBook);

router.put("/:id", validateIdParam("id"), ReaderBookController.updateReaderBook);

router.delete("/:id", validateIdParam("id"), ReaderBookController.deleteReaderBook);

export default router;
