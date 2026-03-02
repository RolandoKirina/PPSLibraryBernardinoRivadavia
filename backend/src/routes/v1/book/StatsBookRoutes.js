import express from "express";
import * as StatsBookController from "../../../controllers/book/StatsBookController.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get('/quantity-books-partners', authorizeRoles(['admin']), StatsBookController.getQuantityBooksAndPartners);

export default router;