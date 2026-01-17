import express from "express";
import * as BookController from "../../../controllers/book/BookController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";


const router = express.Router();

router.get('/lost-book', BookController.getLostBooks);
router.get('/partners-books', BookController.getPartnersAndBooks);

router.get("/", BookController.getAllBooks);

router.get("/withFields", BookController.getAllBooksWithFields);

router.get("/withFields/author/:id", BookController.getAllBooksOfAuthor);

router.get("/withFields/loan/:id", BookController.getAllBooksOfLoan);

router.get("/pendingBooks/:partnerNumber", BookController.getAllPendingBooks);


router.get('/ranking', BookController.getRanking);

router.get('/lostBooks', BookController.getLostBooks);

router.get("/:id", validateIdParam("id"), BookController.getBook);

router.post('/duplicateBook', BookController.duplicateBook);

router.post("/", BookController.createBook);

router.put("/:id", validateIdParam("id"), BookController.updateBook);
router.delete("/:id", validateIdParam("id"), BookController.deleteBook);
export default router;