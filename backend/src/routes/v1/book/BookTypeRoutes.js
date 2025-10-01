import express from "express";
import * as BookTypeController from "../../../controllers/book/BookTypeController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", BookTypeController.getAllBookTypes);
router.get("/:id", validateIdParam("BookType id"), BookTypeController.getBookType);
router.post("/", BookTypeController.createBookType);
router.put("/:id", validateIdParam("BookType id"), BookTypeController.updateBookType);
router.delete("/:id", validateIdParam("BookType id"), BookTypeController.deleteBookType);

export default router;
