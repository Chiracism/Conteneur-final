const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const countrieCtrl = require("../controllers/countrie");

router.get("/", authMiddleware, countrieCtrl.getAllCountries);
router.get("/:id", authMiddleware, countrieCtrl.getOneCountrie);
router.put("/:id", authMiddleware, countrieCtrl.modifyCountrie);
router.post("/", authMiddleware, countrieCtrl.createCountrie);
router.delete("/:id", authMiddleware, countrieCtrl.deleteCountrie);

module.exports = router;
