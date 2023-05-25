const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const surestarieCtrl = require("../controllers/surestarie");

router.get("/", authMiddleware, surestarieCtrl.getAllSurestaries);
router.get("/:id", authMiddleware, surestarieCtrl.getOneSurestarie);
router.put("/:id", authMiddleware, surestarieCtrl.modifySurestarie);
router.post("/", authMiddleware, surestarieCtrl.createSurestarie);
router.delete("/:id", authMiddleware, surestarieCtrl.deleteSurestarie);

module.exports = router;
