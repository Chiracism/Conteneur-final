const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const clientCtrl = require("../controllers/client");

router.get("/", authMiddleware, clientCtrl.getAllClients);
router.get("/:id", authMiddleware, clientCtrl.getOneClient);
router.put("/:id", authMiddleware, clientCtrl.modifyClient);
router.post("/", authMiddleware, clientCtrl.createClient);
router.delete("/:id", authMiddleware, clientCtrl.deleteClient);

module.exports = router;
