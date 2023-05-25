const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const etatconteneurCtrl = require("../controllers/etat_conteneur");

router.get("/", authMiddleware, etatconteneurCtrl.getAllEtatConteneurs);
router.get("/:id", authMiddleware, etatconteneurCtrl.getOneEtatConteneur);
router.put("/:id", authMiddleware, etatconteneurCtrl.modifyEtatConteneur);
router.post("/", authMiddleware, etatconteneurCtrl.createEtatConteneur);
router.delete("/:id", authMiddleware, etatconteneurCtrl.deleteEtatConteneur);

module.exports = router;
