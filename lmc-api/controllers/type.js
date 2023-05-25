const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create type
exports.createType = async (req, res, next) => {
  const typeObject = JSON.parse(JSON.stringify(req.body));

  delete typeObject.id;

  db.Type.create({
    ...typeObject,
  })
    .then((type) => {
      res.status(200).json(type.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single type
exports.getOneType = async (req, res, next) => {
  let type = await db.type.findOne({
    where: { id: req.params.id },
  });

  if (type) {
    res.status(200).json(type);
  } else {
    res.status(400).json({ message: "Error on getting type" });
  }
};

// Endpoint to update type
exports.modifyType = async ({ body, query, params }, res, next) => {
  const typeObject = JSON.parse(JSON.stringify(body));

  db.Type.update(
    { ...typeObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Type.findOne({ where: { id: params.id } })
        .then((type) => {
          res.status(200).json(type);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all types
exports.getAllTypes = async (req, res, next) => {
  db.Type.findAll()
    .then((types) => {
      res.status(200).json(types);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete type
exports.deleteType = async (req, res, next) => {
  db.Type.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Type deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
