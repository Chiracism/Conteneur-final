const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const materielCtrl = require("../controllers/materiel");

router.get("/", authMiddleware, materielCtrl.getAllMateriels);
router.get("/:id", authMiddleware, materielCtrl.getOneMateriel);
router.put("/:id", authMiddleware, materielCtrl.modifyMateriel);
router.post("/", authMiddleware, materielCtrl.createMateriel);
router.delete("/:id", authMiddleware, materielCtrl.deleteMateriel);

module.exports = router;
