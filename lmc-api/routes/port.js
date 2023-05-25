const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const portCtrl = require("../controllers/port");

router.get("/", authMiddleware, portCtrl.getAllPorts);
router.get("/:id", authMiddleware, portCtrl.getOnePort);
router.put("/:id", authMiddleware, portCtrl.modifyPort);
router.post("/", authMiddleware, portCtrl.createPort);
router.delete("/:id", authMiddleware, portCtrl.deletePort);

module.exports = router;
