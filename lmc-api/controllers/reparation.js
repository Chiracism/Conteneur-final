const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create reparation
exports.createReparation = async (req, res, next) => {
  const reparationObject = JSON.parse(JSON.stringify(req.body));

  delete reparationObject.id;

  db.Reparation.create({
    ...reparationObject,
  })
    .then((reparation) => {
      res.status(200).json(reparation.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single reparation
exports.getOneReparation = async (req, res, next) => {
  let reparation = await db.reparation.findOne({
    where: { id: req.params.id },
  });

  if (reparation) {
    res.status(200).json(reparation);
  } else {
    res.status(400).json({ message: "Error on getting reparation" });
  }
};

// Endpoint to update reparation
exports.modifyReparation = async ({ body, query, params }, res, next) => {
  const reparationObject = JSON.parse(JSON.stringify(body));

  db.Reparation.update(
    { ...reparationObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Reparation.findOne({ where: { id: params.id } })
        .then((reparation) => {
          res.status(200).json(reparation);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all reparations
exports.getAllReparations = async (req, res, next) => {
  db.Reparation.findAll()
    .then((reparations) => {
      res.status(200).json(reparations);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete reparation
exports.deleteReparation = async (req, res, next) => {
  db.Reparation.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Reparation deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
