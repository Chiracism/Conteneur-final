const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const positionCtrl = require("../controllers/position");

router.get("/", authMiddleware, positionCtrl.getAllPositions);
router.get("/:id", authMiddleware, positionCtrl.getOnePosition);
router.put("/:id", authMiddleware, positionCtrl.modifyPosition);
router.post("/", authMiddleware, positionCtrl.createPosition);
router.delete("/:id", authMiddleware, positionCtrl.deletePosition);

module.exports = router;