const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create countrie
exports.createDevise = async (req, res, next) => {
  const deviseObject = JSON.parse(JSON.stringify(req.body));

  delete deviseObject.id;

  db.Devise.create({
    ...deviseObject,
  })
    .then((devise) => {
      res.status(200).json(devise.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single devise
exports.getOneDevise = async (req, res, next) => {
  let devise = await db.devise.findOne({
    where: { id: req.params.id },
  });

  if (devise) {
    res.status(200).json(devise);
  } else {
    res.status(400).json({ message: "Error on getting devise" });
  }
};

// Endpoint to update devise
exports.modifyDevise = async ({ body, query, params }, res, next) => {
  const deviseObject = JSON.parse(JSON.stringify(body));

  db.Devise.update(
    { ...deviseObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Devise.findOne({ where: { id: params.id } })
        .then((devise) => {
          res.status(200).json(devise);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all devise
exports.getAllDevises = async (req, res, next) => {
  db.Devise.findAll()
    .then((devises) => {
      res.status(200).json(devises);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete devise
exports.deleteDevise = async (req, res, next) => {
  db.Devise.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Devise deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
