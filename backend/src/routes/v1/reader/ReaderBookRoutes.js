import express from "express";
import * as ReaderBookController from "../../../controllers/reader/ReaderBookController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authorizeRoles(['admin']), ReaderBookController.getAllReaderBooks);

router.get("/:id", authorizeRoles(['admin']), validateIdParam("id"), ReaderBookController.getReaderBook);

router.get('/repeated-book/:id', authorizeRoles(['admin']), ReaderBookController.verifyIfBookIsNotRepeated);

router.post("/", authorizeRoles(['admin']), ReaderBookController.createReaderBook);

router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), ReaderBookController.updateReaderBook);

router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), ReaderBookController.deleteReaderBook);

export default router;
