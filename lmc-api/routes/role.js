const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const roleCtrl = require("../controllers/role");

router.get("/", authMiddleware, roleCtrl.getAllRoles);
router.get("/:id", authMiddleware, roleCtrl.getOneRole);

module.exports = router;
