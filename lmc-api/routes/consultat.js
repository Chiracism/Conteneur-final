const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const consultatCtrl = require("../controllers/consultat");

router.get("/", authMiddleware, consultatCtrl.getAllConsultats);
router.get("/:id", authMiddleware, consultatCtrl.getOneConsultat);
router.put("/:id", authMiddleware, consultatCtrl.modifyConsultat);
router.post("/", authMiddleware, consultatCtrl.createConsultat);
router.delete("/:id", authMiddleware, consultatCtrl.deleteConsultat);

module.exports = router;
