import express from "express";
import * as BookController from "../../../controllers/book/BookController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";


const router = express.Router();

router.get("/",BookController.getAllBooks);
router.get("/withFields",BookController.getAllBooksWithFields);

router.get('/ranking', BookController.getRanking);

router.get("/:id", validateIdParam("id"), BookController.getBook);


router.post("/",BookController.createBook);
router.put("/:id", validateIdParam("id"), BookController.updateBook);
router.delete("/:id",validateIdParam("id"), BookController.deleteBook);
export default router;