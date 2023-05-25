const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create consultat
exports.createConsultat = async (req, res, next) => {
  const consultatObject = JSON.parse(JSON.stringify(req.body));

  delete consultatObject.id;

  db.Consultat.create({
    ...consultatObject,
  })
    .then((consultat) => {
      res.status(200).json(consultat.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single consultat
exports.getOneConsultat = async (req, res, next) => {
  let consultat = await db.consultat.findOne({
    where: { id: req.params.id },
  });

  if (consultat) {
    res.status(200).json(consultat);
  } else {
    res.status(400).json({ message: "Error on getting consultat" });
  }
};

// Endpoint to update consultat
exports.modifyConsultat = async ({ body, query, params }, res, next) => {
  const consultatObject = JSON.parse(JSON.stringify(body));

  db.Consultat.update(
    { ...consultatObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Consultat.findOne({ where: { id: params.id } })
        .then((consultat) => {
          res.status(200).json(consultat);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all consultat
exports.getAllConsultats = async (req, res, next) => {
  db.Consultat.findAll()
    .then((consultats) => {
      res.status(200).json(consultats);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete consultat
exports.deleteConsultat = async (req, res, next) => {
  db.Consultat.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Consultat deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
