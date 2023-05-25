const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create sous-site
exports.createSoussite = async (req, res, next) => {
  const soussiteObject = JSON.parse(JSON.stringify(req.body));

  delete soussiteObject.id;

  db.Soussite.create({
    ...soussiteObject,
  })
    .then((soussite) => {
      res.status(200).json(soussite.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single sous-site
exports.getOneSoussite = async (req, res, next) => {
  let soussite = await db.soussite.findOne({
    where: { id: req.params.id },
  });

  if (soussite) {
    res.status(200).json(soussite);
  } else {
    res.status(400).json({ message: "Error on getting sous-site" });
  }
};

// Endpoint to update sous-site
exports.modifySoussite = async ({ body, query, params }, res, next) => {
  const soussiteObject = JSON.parse(JSON.stringify(body));

  db.Soussite.update(
    { ...soussiteObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Soussite.findOne({ where: { id: params.id } })
        .then((soussite) => {
          res.status(200).json(soussite);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all Sous-site
exports.getAllSoussites = async (req, res, next) => {
  db.Soussite.findAll()
    .then((soussites) => {
      res.status(200).json(soussites);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete sous-site
exports.deleteSoussite = async (req, res, next) => {
  db.Soussite.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Sous-site deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
