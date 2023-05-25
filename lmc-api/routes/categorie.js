const express = require("express");
const router = express.Router();

import authMiddleware from "../middleware/auth";

const categorieCtrl = require("../controllers/categorie");

router.get("/", authMiddleware, categorieCtrl.getAllCategories);
router.get("/:id", authMiddleware, categorieCtrl.getOneCategorie);
router.put("/:id", authMiddleware, categorieCtrl.modifyCategorie);
router.post("/", authMiddleware, categorieCtrl.createCategorie);
router.delete("/:id", authMiddleware, categorieCtrl.deleteCategorie);

module.exports = router;
