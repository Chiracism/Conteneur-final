const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const rateCtrl = require("../controllers/rate");

router.get("/", authMiddleware, rateCtrl.getAllRates);
router.get("/:id", authMiddleware, rateCtrl.getOneRate);
router.put("/:id", authMiddleware, rateCtrl.modifyRate);
router.post("/", authMiddleware, rateCtrl.createRate);
router.delete("/:id", authMiddleware, rateCtrl.deleteRate);

module.exports = router;
