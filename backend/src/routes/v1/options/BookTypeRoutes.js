import express from "express";
import * as BookTypeController from "../../../controllers/options/BookTypeController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", BookTypeController.getAllBookTypes);
router.get("/count", BookTypeController.getCount);
router.get("/:id", validateIdParam("id"), BookTypeController.getBookType);
router.post("/", BookTypeController.createBookType);
router.put("/:id", validateIdParam("id"), BookTypeController.updateBookType);
router.delete("/:id", validateIdParam("id"), BookTypeController.deleteBookType);

export default router;
