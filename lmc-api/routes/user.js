const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const userCtrl = require("../controllers/user");

router.post("/auth/", userCtrl.getAuthUser);
router.get("/", authMiddleware, userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", authMiddleware, userCtrl.modifyUser);
router.post("/", authMiddleware, userCtrl.createUser);
router.delete("/:id", authMiddleware, userCtrl.deleteUser);

module.exports = router;
