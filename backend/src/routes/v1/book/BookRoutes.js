import express from "express";
import * as BookController from "../../../controllers/book/BookController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";


const router = express.Router();

router.get("/",BookController.getAllBooks);
router.get("/:id", validateIdParam("Book id"), BookController.getBook);
router.post("/",BookController.createBook);
router.put("/:id", validateIdParam("Book id"), BookController.updateBook);
router.delete("/:id",validateIdParam("Book id"), BookController.deleteBook);
export default router;