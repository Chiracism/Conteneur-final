const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const deviseCtrl = require("../controllers/devise");

router.get("/", authMiddleware, deviseCtrl.getAllDevises);
router.get("/:id", authMiddleware, deviseCtrl.getOneDevise);
router.put("/:id", authMiddleware, deviseCtrl.modifyDevise);
router.post("/", authMiddleware, deviseCtrl.createDevise);
router.delete("/:id", authMiddleware, deviseCtrl.deleteDevise);

module.exports = router;
