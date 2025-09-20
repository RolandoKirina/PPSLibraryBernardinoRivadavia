import express from "express";
import * as BookController from "../../controllers/BookController.js";
const ROUTER = express.Router();

ROUTER.get("/",BookController.getAllBooks);

export default ROUTER;