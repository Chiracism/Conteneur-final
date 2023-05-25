const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create countrie
exports.createCountrie = async (req, res, next) => {
  const countrieObject = JSON.parse(JSON.stringify(req.body));

  delete countrieObject.id;

  db.Countrie.create({
    ...countrieObject,
  })
    .then((countrie) => {
      res.status(200).json(countrie.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single countrie
exports.getOneCountrie = async (req, res, next) => {
  let countrie = await db.countrie.findOne({
    where: { id: req.params.id },
  });

  if (countrie) {
    res.status(200).json(countrie);
  } else {
    res.status(400).json({ message: "Error on getting countrie" });
  }
};

// Endpoint to update countrie
exports.modifyCountrie = async ({ body, query, params }, res, next) => {
  const countrieObject = JSON.parse(JSON.stringify(body));

  db.Countrie.update(
    { ...countrieObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Countrie.findOne({ where: { id: params.id } })
        .then((countrie) => {
          res.status(200).json(countrie);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all countrie
exports.getAllCountries = async (req, res, next) => {
  db.Countrie.findAll()
    .then((countries) => {
      res.status(200).json(countries);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete countrie
exports.deleteCountrie = async (req, res, next) => {
  db.Countrie.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Countrie deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
