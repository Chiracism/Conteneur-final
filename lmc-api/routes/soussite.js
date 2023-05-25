const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const soussiteCtrl = require("../controllers/soussite");

router.get("/", authMiddleware, soussiteCtrl.getAllSoussites);
router.get("/:id", authMiddleware, soussiteCtrl.getOneSoussite);
router.put("/:id", authMiddleware, soussiteCtrl.modifySoussite);
router.post("/", authMiddleware, soussiteCtrl.createSoussite);
router.delete("/:id", authMiddleware, soussiteCtrl.deleteSoussite);

module.exports = router;
