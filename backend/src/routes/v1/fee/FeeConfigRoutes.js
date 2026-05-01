import express from "express";
import * as FeeConfigController from "../../../controllers/fee/FeeConfigController.js";
import validateIdParam from "../../../middlewares/ValidateId.js";
import { authorizeRoles } from "../../../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", 
    authorizeRoles(['admin']), 
    FeeConfigController.getAllConfigs
);

router.get("/:id", 
    authorizeRoles(['admin']), 
    validateIdParam("id"), 
    FeeConfigController.getConfig
);

router.post("/", 
    authorizeRoles(['admin']), 
    FeeConfigController.createConfig
);

router.put("/:id", 
    authorizeRoles(['admin']), 
    validateIdParam("id"), 
    FeeConfigController.updateConfig
);

// Eliminar una configuración
router.delete("/:id", 
    authorizeRoles(['admin']), 
    validateIdParam("id"), 
    FeeConfigController.deleteConfig
);

export default router;