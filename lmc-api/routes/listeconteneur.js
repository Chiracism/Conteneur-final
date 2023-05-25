const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const listeconteneurCtrl = require("../controllers/listeconteneur");

router.get("/", authMiddleware, listeconteneurCtrl.getAllListeConteurs);
router.get("/:id", authMiddleware, listeconteneurCtrl.getOneListeConteneur);
router.put("/:id", authMiddleware, listeconteneurCtrl.modifyListeConteneur);
router.post("/", authMiddleware, listeconteneurCtrl.createListeConteneur);
router.delete("/:id", authMiddleware, listeconteneurCtrl.deleteListeConteneur);

module.exports = router;