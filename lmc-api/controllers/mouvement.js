const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create mouvement
exports.createMouvement = async (req, res, next) => {
  const mouvementObject = JSON.parse(JSON.stringify(req.body));

  delete mouvementObject.id;

  db.Mouvement.create({
    ...mouvementObject,
  })
    .then((mouvement) => {
      res.status(200).json(mouvement.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single mouvement
exports.getOneMouvement = async (req, res, next) => {
  let mouvement = await db.mouvement.findOne({
    where: { id: req.params.id },
  });

  if (mouvement) {
    res.status(200).json(mouvement);
  } else {
    res.status(400).json({ message: "Error on getting mouvement" });
  }
};

// Endpoint to update mouvement
exports.modifyMouvement = async ({ body, query, params }, res, next) => {
  const mouvementObject = JSON.parse(JSON.stringify(body));

  db.Mouvement.update(
    { ...mouvementObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Mouvement.findOne({ where: { id: params.id } })
        .then((mouvement) => {
          res.status(200).json(mouvement);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all mouvement
exports.getAllMouvements = async (req, res, next) => {
  db.Mouvement.findAll()
    .then((mouvements) => {
      res.status(200).json(mouvements);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete mouvement
exports.deleteMouvement = async (req, res, next) => {
  db.Mouvement.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Mouvement deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
