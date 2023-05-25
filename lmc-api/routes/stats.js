const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const statCtrl = require("../controllers/stats");

router.get("/", authMiddleware, statCtrl.getAllStats);

module.exports = router;
