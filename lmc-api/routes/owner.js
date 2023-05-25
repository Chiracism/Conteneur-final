const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const ownerCtrl = require("../controllers/owner");

router.get("/", authMiddleware, ownerCtrl.getAllOwners);
router.get("/:id", authMiddleware, ownerCtrl.getOneOwner);
router.put("/:id", authMiddleware, ownerCtrl.modifyOwner);
router.post("/", authMiddleware, ownerCtrl.createOwner);
router.delete("/:id", authMiddleware, ownerCtrl.deleteOwner);

module.exports = router;
