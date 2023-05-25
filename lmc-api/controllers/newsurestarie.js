const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create newSurestarie
exports.createNewSurestarie = async (req, res, next) => {
  const newSurestarieObject = JSON.parse(JSON.stringify(req.body));

  delete newSurestarieObject.id;

  db.Newsurestarie.create({
    ...newSurestarieObject,
  })
    .then((newSurestarie) => {
      res.status(200).json(newSurestarie.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single newSurestarie
exports.getOnenewSurestarie = async (req, res, next) => {
  let newSurestarie = await db.Newsurestarie.findOne({
    where: { id: req.params.id },
  });

  if (newSurestarie) {
    res.status(200).json(newSurestarie);
  } else {
    res.status(400).json({ message: "Error on getting NewSurestarie" });
  }
};

// Endpoint to update newSurestarie
exports.modifynewSurestarie = async ({ body, query, params }, res, next) => {
  const newSurestarieObject = JSON.parse(JSON.stringify(body));

  db.Newsurestarie.update(
    { ...newSurestarieObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Newsurestarie.findOne({ where: { id: params.id } })
        .then((newSurestarie) => {
          res.status(200).json(newSurestarie);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all newSurestaries
exports.getAllnewSurestaries = async (req, res, next) => {
  db.Newsurestarie.findAll()
    .then((newSurestaries) => {
      res.status(200).json(newSurestaries);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete newSurestarie
exports.deletenewSurestarie = async (req, res, next) => {
  db.Newsurestarie.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "newSurestarie deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
