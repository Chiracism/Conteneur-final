const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const reparationCtrl = require("../controllers/reparation");

router.get("/", authMiddleware, reparationCtrl.getAllReparations);
router.get("/:id", authMiddleware, reparationCtrl.getOneReparation);
router.put("/:id", authMiddleware, reparationCtrl.modifyReparation);
router.post("/", authMiddleware, reparationCtrl.createReparation);
router.delete("/:id", authMiddleware, reparationCtrl.deleteReparation);

module.exports = router;
