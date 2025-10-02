import express from "express";
import * as SignController from "../../../controllers/signs/SignController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";

const router = express.Router();

router.get("/", SignController.getAllSigns);
router.get("/:id", validateIdParam("Sign id"), SignController.getSign);
router.post("/", SignController.createSign);
router.put("/:id", validateIdParam("Sign id"), SignController.updateSign);
router.delete("/:id", validateIdParam("Sign id"), SignController.deleteSign);

export default router;
