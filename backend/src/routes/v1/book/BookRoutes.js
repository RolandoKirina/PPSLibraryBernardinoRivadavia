import express from "express";
import * as BookController from "../../../controllers/book/BookController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
const router = express.Router();

router.get("/",BookController.getAllBooks);
router.get("/:id", validateIdParam("Book id"), BookController.getBook);
export default router;