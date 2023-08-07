const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const statutCtrl = require("../controllers/statut");

router.get("/", authMiddleware, statutCtrl.getAllStatuts);
router.get("/:id", authMiddleware, statutCtrl.getOneStatut);
router.put("/:id", authMiddleware, statutCtrl.modifyStatut);
router.post("/", authMiddleware, statutCtrl.createStatut);
router.delete("/:id", authMiddleware, statutCtrl.deleteStatut);

module.exports = router;
