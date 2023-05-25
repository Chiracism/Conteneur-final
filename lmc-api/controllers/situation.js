const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create SituationConteneur
exports.createSituation = async (req, res, next) => {
  const situationObject = JSON.parse(JSON.stringify(req.body));

  delete situationObject.id;

  db.situation.create({
    ...situationObject,
  })
    .then((situation) => {
      res.status(200).json(situation.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single Situation
exports.getOneSituation = async (req, res, next) => {
  let situation = await db.situation.findOne({
    where: { id: req.params.id },
  });

  if (situation) {
    res.status(200).json(situation);
  } else {
    res.status(400).json({ message: "Error on getting Situation" });
  }
};

// Endpoint to update Situation
exports.modifySituation = async ({ body, query, params }, res, next) => {
  const situationObject = JSON.parse(JSON.stringify(body));

  db.situation.update(
    { ...situationObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.situation.findOne({ where: { id: params.id } })
        .then((situation) => {
          res.status(200).json(situation);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all Situations
exports.getAllSituations = async (req, res, next) => {
  db.Situation.findAll()
    .then((situations) => {
      res.status(200).json(situations);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete Situation
exports.deleteSituation = async (req, res, next) => {
  db.situation.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Situation deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};