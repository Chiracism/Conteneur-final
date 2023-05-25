const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to get single role
exports.getOneRole = async (req, res, next) => {
  let role = await db.Role.findOne({ where: { id: req.params.id } });

  if (role) {
    res.status(200).json(role);
  } else {
    res.status(400).json({ message: "Error on getting role" });
  }
};

// Endpoint to get all roles
exports.getAllRoles = async (req, res, next) => {
  db.Role.findAll()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((error) => res.status(400).json({ error }));
};
