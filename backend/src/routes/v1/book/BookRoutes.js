import express from "express";
import * as BookController from "../../../controllers/book/BookController.js";
const router = express.Router();

router.get("/",BookController.getAllBooks);
router.get("/book/:id", validateIdParam("book id"), getBook);
export default router;