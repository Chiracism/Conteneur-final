const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create Owner
exports.createOwner = async (req, res, next) => {
  const ownerObject = JSON.parse(JSON.stringify(req.body));

  delete ownerObject.id;

  db.Owner.create({
    ...ownerObject,
  })
    .then((owner) => {
      res.status(200).json(owner.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single owner
exports.getOneOwner = async (req, res, next) => {
  let owner = await db.owner.findOne({
    where: { id: req.params.id },
  });

  if (owner) {
    res.status(200).json(owner);
  } else {
    res.status(400).json({ message: "Error on getting owner" });
  }
};

// Endpoint to update owner
exports.modifyOwner = async ({ body, query, params }, res, next) => {
  const ownerObject = JSON.parse(JSON.stringify(body));

  db.Owner.update(
    { ...ownerObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Owner.findOne({ where: { id: params.id } })
        .then((owner) => {
          res.status(200).json(owner);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all owner
exports.getAllOwners = async (req, res, next) => {
  db.Owner.findAll()
    .then((owners) => {
      res.status(200).json(owners);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete owner
exports.deleteOwner = async (req, res, next) => {
  db.Owner.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Owner deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
