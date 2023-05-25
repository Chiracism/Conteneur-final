const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const mouvementCtrl = require("../controllers/mouvement");

router.get("/", authMiddleware, mouvementCtrl.getAllMouvements);
router.get("/:id", authMiddleware, mouvementCtrl.getOneMouvement);
router.put("/:id", authMiddleware, mouvementCtrl.modifyMouvement);
router.post("/", authMiddleware, mouvementCtrl.createMouvement);
router.delete("/:id", authMiddleware, mouvementCtrl.deleteMouvement);

module.exports = router;
