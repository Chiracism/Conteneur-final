const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const choixCtrl = require("../controllers/choix");

router.get("/", authMiddleware, choixCtrl.getAllChoix);
router.get("/:id", authMiddleware, choixCtrl.getOneChoix);
router.put("/:id", authMiddleware, choixCtrl.modifyChoix);
router.post("/", authMiddleware, choixCtrl.createChoix);
router.delete("/:id", authMiddleware, choixCtrl.deleteChoix);

module.exports = router;
