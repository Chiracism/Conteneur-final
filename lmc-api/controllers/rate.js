const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create rate
exports.createRate = async (req, res, next) => {
  const rateObject = JSON.parse(JSON.stringify(req.body));

  delete rateObject.id;

  db.Rate.create({
    ...rateObject,
  })
    .then((rate) => {
      res.status(200).json(rate.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single rate
exports.getOneRate = async (req, res, next) => {
  let rate = await db.rate.findOne({
    where: { id: req.params.id },
  });

  if (rate) {
    res.status(200).json(rate);
  } else {
    res.status(400).json({ message: "Error on getting rate" });
  }
};

// Endpoint to update rate
exports.modifyRate = async ({ body, query, params }, res, next) => {
  const rateObject = JSON.parse(JSON.stringify(body));

  db.Rate.update(
    { ...rateObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Rate.findOne({ where: { id: params.id } })
        .then((rate) => {
          res.status(200).json(rate);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all rate
exports.getAllRates = async (req, res, next) => {
  db.Rate.findAll()
    .then((rates) => {
      res.status(200).json(rates);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete rate
exports.deleteRate = async (req, res, next) => {
  db.Rate.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Rate deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
