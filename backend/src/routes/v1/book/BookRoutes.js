import express from "express";
import * as BookController from "../../../controllers/book/BookController.js";
const router = express.Router();

router.get("/",BookController.getAllBooks);

export default router;