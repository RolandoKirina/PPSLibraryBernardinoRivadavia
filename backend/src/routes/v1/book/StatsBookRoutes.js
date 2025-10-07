import express from "express";
import * as StatsBookController from "../../../controllers/book/StatsBookController.js";
const router = express.Router();


router.get('/quantity-books-partners', StatsBookController.getQuantityBooksAndPartners);

export default router;