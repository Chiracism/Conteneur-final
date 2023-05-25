const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const newsurestarieCtrl = require("../controllers/newsurestarie");

router.get("/", authMiddleware, newsurestarieCtrl.getAllnewSurestaries);
router.get("/:id", authMiddleware, newsurestarieCtrl.getOnenewSurestarie);
router.put("/:id", authMiddleware, newsurestarieCtrl.modifynewSurestarie);
router.post("/", authMiddleware, newsurestarieCtrl.createNewSurestarie);
router.delete("/:id", authMiddleware, newsurestarieCtrl.deletenewSurestarie);

module.exports = router;