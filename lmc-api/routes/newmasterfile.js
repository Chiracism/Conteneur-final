const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const newMasterfileCtrl = require("../controllers/newmasterfile");

router.get("/", authMiddleware, newMasterfileCtrl.getAllNewMasterFiles);
router.get("/:id", authMiddleware, newMasterfileCtrl.getOneNewMasterFile);
router.put("/:id", authMiddleware, newMasterfileCtrl.modifyNewMasterFile);
router.post("/", authMiddleware, newMasterfileCtrl.createNewMasterFile);
router.delete("/:id", authMiddleware, newMasterfileCtrl.deleteNewMasterFile);

module.exports = router;