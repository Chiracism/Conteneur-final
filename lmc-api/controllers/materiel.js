const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create materiel
exports.createMateriel = async (req, res, next) => {
  const materielObject = JSON.parse(JSON.stringify(req.body));

  delete materielObject.id;

  db.Materiel.create({
    ...materielObject,
  })
    .then((materiel) => {
      res.status(200).json(materiel.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single materiel
exports.getOneMateriel = async (req, res, next) => {
  let materiel = await db.materiel.findOne({
    where: { id: req.params.id },
  });

  if (materiel) {
    res.status(200).json(materiel);
  } else {
    res.status(400).json({ message: "Error on getting materiel" });
  }
};

// Endpoint to update materiel
exports.modifyMateriel = async ({ body, query, params }, res, next) => {
  const materielObject = JSON.parse(JSON.stringify(body));

  db.Materiel.update(
    { ...materielObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Materiel.findOne({ where: { id: params.id } })
        .then((materiel) => {
          res.status(200).json(materiel);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all materiel
exports.getAllMateriels = async (req, res, next) => {
  db.Materiel.findAll()
    .then((materiels) => {
      res.status(200).json(materiels);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete materiel
exports.deleteMateriel = async (req, res, next) => {
  db.Materiel.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Materiel deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
