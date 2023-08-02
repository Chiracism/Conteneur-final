const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const positionnementCtrl = require("../controllers/positionnement");

router.get("/", authMiddleware, positionnementCtrl.getAllpositionnements);
router.get("/:id", authMiddleware, positionnementCtrl.getOnepositionnement);
router.put("/:id", authMiddleware, positionnementCtrl.modifypositionnement);
router.post("/", authMiddleware, positionnementCtrl.createpositionnement);
router.delete("/:id", authMiddleware, positionnementCtrl.deletepositionnement);

module.exports = router;