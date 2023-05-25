const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create navire
exports.createNavire = async (req, res, next) => {
  const navireObject = JSON.parse(JSON.stringify(req.body));

  delete navireObject.id;

  db.Navire.create({
    ...navireObject,
  })
    .then((navire) => {
      res.status(200).json(navire.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single navire
exports.getOneNavire = async (req, res, next) => {
  let navire = await db.navire.findOne({
    where: { id: req.params.id },
  });

  if (navire) {
    res.status(200).json(navire);
  } else {
    res.status(400).json({ message: "Error on getting navire" });
  }
};

// Endpoint to update navire
exports.modifyNavire = async ({ body, query, params }, res, next) => {
  const navireObject = JSON.parse(JSON.stringify(body));

  db.Navire.update(
    { ...navireObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Navire.findOne({ where: { id: params.id } })
        .then((navire) => {
          res.status(200).json(navire);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all navire
exports.getAllNavires = async (req, res, next) => {
  db.Navire.findAll()
    .then((navires) => {
      res.status(200).json(navires);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete navire
exports.deleteNavire = async (req, res, next) => {
  db.Navire.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Vessel deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
