const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const situationCtrl = require("../controllers/situation");

router.get("/", authMiddleware, situationCtrl.getAllSituations);
router.get("/:id", authMiddleware, situationCtrl.getOneSituation);
router.put("/:id", authMiddleware, situationCtrl.modifySituation);
router.post("/", authMiddleware, situationCtrl.createSituation);
router.delete("/:id", authMiddleware, situationCtrl.deleteSituation);

module.exports = router;