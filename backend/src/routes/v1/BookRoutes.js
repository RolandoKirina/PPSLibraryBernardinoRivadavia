import express from "express";
import * as BookController from "../../controllers/BookController.js";
const router = express.Router();

router.get("/",BookController.getAllBooks);

export default router;