const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const masterfileCtrl = require("../controllers/masterfile");

router.get("/", authMiddleware, masterfileCtrl.getAllMasterfiles);
router.get("/:id", authMiddleware, masterfileCtrl.getOneMasterFile);
router.put("/:id", authMiddleware, masterfileCtrl.modifyMasterfile);
router.post("/", authMiddleware, masterfileCtrl.createMasterfile);
router.delete("/:id", authMiddleware, masterfileCtrl.deleteMasterfile);

// router.post("/", authMiddleware, masterfileCtrl.createMasterfile);
// router.get("/", authMiddleware, masterfileCtrl.getAllMasterfiles);
// router.post("/", authMiddleware, masterfileCtrl.createMasterfile);

module.exports = router;
