const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const siteCtrl = require("../controllers/site");

router.get("/", authMiddleware, siteCtrl.getAllSites);
router.get("/:id", authMiddleware, siteCtrl.getOneSite);
router.put("/:id", authMiddleware, siteCtrl.modifySite);
router.post("/", authMiddleware, siteCtrl.createSite);
router.delete("/:id", authMiddleware, siteCtrl.deleteSite);

module.exports = router;
