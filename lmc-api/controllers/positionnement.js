const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create positionnement
exports.createpositionnement = async (req, res, next) => {
  const positionnementObject = JSON.parse(JSON.stringify(req.body));
  console.log('positionnementObject : ', positionnementObject);
  delete positionnementObject.id;

  db.positionnement.create({
    ...positionnementObject,
  })
    .then((positionnement) => {
      res.status(200).json(positionnement.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single positionnement
exports.getOnepositionnement = async (req, res, next) => {
  let positionnement = await db.positionnement.findOne({
    where: { id: req.params.id },
  });

  if (positionnement) {
    res.status(200).json(positionnement);
  } else {
    res.status(400).json({ message: "Error on getting positionnement" });
  }
};

// Endpoint to update positionnement
exports.modifypositionnement = async ({ body, query, params }, res, next) => {
  const positionnementObject = JSON.parse(JSON.stringify(body));

  db.positionnement.update(
    { ...positionnementObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.positionnement.findOne({ where: { id: params.id } })
        .then((positionnement) => {
          res.status(200).json(positionnement);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all positionnement
exports.getAllpositionnements = async (req, res, next) => {
  db.positionnement.findAll()
    .then((positionnements) => {
      res.status(200).json(positionnements);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete positionnement
exports.deletepositionnement = async (req, res, next) => {
  db.positionnement.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "positionnement deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
