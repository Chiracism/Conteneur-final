const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create suretarie
exports.createSurestarie = async (req, res, next) => {
  const surestarieObject = JSON.parse(JSON.stringify(req.body));

  delete surestarieObject.id;

  db.Surestarie.create({
    ...surestarieObject,
  })
    .then((surestarie) => {
      res.status(200).json(surestarie.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single surestarie
exports.getOneSurestarie = async (req, res, next) => {
  let surestarie = await db.surestarie.findOne({
    where: { id: req.params.id },
  });

  if (surestarie) {
    res.status(200).json(surestarie);
  } else {
    res.status(400).json({ message: "Error on getting surestarie" });
  }
};

// Endpoint to update surestarie
exports.modifySurestarie = async ({ body, query, params }, res, next) => {
  const surestarieObject = JSON.parse(JSON.stringify(body));

  db.Surestarie.update(
    { ...surestarieObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Surestarie.findOne({ where: { id: params.id } })
        .then((surestarie) => {
          res.status(200).json(surestarie);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all surestaries
exports.getAllSurestaries = async (req, res, next) => {
  db.Surestarie.findAll()
    .then((surestaries) => {
      res.status(200).json(surestaries);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete surestarie
exports.deleteSurestarie = async (req, res, next) => {
  db.Surestarie.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Surestarie deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
