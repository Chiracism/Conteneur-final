const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const typeCtrl = require("../controllers/type");

router.get("/", authMiddleware, typeCtrl.getAllTypes);
router.get("/:id", authMiddleware, typeCtrl.getOneType);
router.put("/:id", authMiddleware, typeCtrl.modifyType);
router.post("/", authMiddleware, typeCtrl.createType);
router.delete("/:id", authMiddleware, typeCtrl.deleteType);

module.exports = router;
