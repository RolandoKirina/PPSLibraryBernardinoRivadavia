import express from "express";
import * as BookKeyController from "../../../controllers/book/BookKeyController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", BookKeyController.getAllBookKeys);
router.get("/:id", validateIdParam("BookKey id"), BookKeyController.getBookKey);
router.post("/", BookKeyController.createBookKey);
router.put("/:id", validateIdParam("BookKey id"), BookKeyController.updateBookKey);
router.delete("/:id", validateIdParam("BookKey id"), BookKeyController.deleteBookKey);

export default router;
