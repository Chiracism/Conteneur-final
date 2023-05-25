const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const agenceCtrl = require("../controllers/agence");

router.get("/", authMiddleware, agenceCtrl.getAllAgences);
router.get("/:id", authMiddleware, agenceCtrl.getOneAgence);
router.put("/:id", authMiddleware, agenceCtrl.modifyAgence);
router.post("/", authMiddleware, agenceCtrl.createAgence);
router.delete("/:id", authMiddleware, agenceCtrl.deleteAgence);

module.exports = router;
