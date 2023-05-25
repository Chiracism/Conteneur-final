const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const sizeCtrl = require("../controllers/size");

router.get("/", authMiddleware, sizeCtrl.getAllSizes);
router.get("/:id", authMiddleware, sizeCtrl.getOneSize);
router.put("/:id", authMiddleware, sizeCtrl.modifySize);
router.post("/", authMiddleware, sizeCtrl.createSize);
router.delete("/:id", authMiddleware, sizeCtrl.deleteSize);

module.exports = router;
