import express from "express";
import * as BookController from "../../../controllers/book/BookController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authenticate } from "../../../middlewares/authenticate.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";


const router = express.Router();

router.get('/lost-book', authorizeRoles(['admin']), BookController.getLostBooks);

router.get('/partners-books', authorizeRoles(['admin']), BookController.getPartnersAndBooks);

router.get("/", BookController.getAllBooks);

router.get("/withFields", BookController.getAllBooksWithFields);

router.get("/withFields/author/:id", BookController.getAllBooksOfAuthor);

router.get("/withFields/loan/:id", authorizeRoles(['admin', 'partner']), BookController.getAllBooksOfLoan);

router.get("/pendingBooks/:partnerNumber", authorizeRoles(['admin']), BookController.getAllPendingBooks);

router.get('/ranking', authorizeRoles(['admin']), BookController.getRanking);

router.get('/lostBooks', authorizeRoles(['admin']), BookController.getLostBooks);

router.get("/:id", validateIdParam("id"), BookController.getBook);

router.post('/duplicateBook', authorizeRoles(['admin']), BookController.duplicateBook);

router.post("/", authorizeRoles(['admin']), BookController.createBook);

router.put("/:id", authorizeRoles(['admin']), validateIdParam("id"), BookController.updateBook);

router.delete("/:id", authorizeRoles(['admin']), validateIdParam("id"), BookController.deleteBook);

export default router;