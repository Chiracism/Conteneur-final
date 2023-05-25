const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const navireCtrl = require("../controllers/navire");

router.get("/", authMiddleware, navireCtrl.getAllNavires);
router.get("/:id", authMiddleware, navireCtrl.getOneNavire);
router.put("/:id", authMiddleware, navireCtrl.modifyNavire);
router.post("/", authMiddleware, navireCtrl.createNavire);
router.delete("/:id", authMiddleware, navireCtrl.deleteNavire);

module.exports = router;
