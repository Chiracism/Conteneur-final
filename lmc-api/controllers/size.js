const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create size
exports.createSize = async (req, res, next) => {
  const sizeObject = JSON.parse(JSON.stringify(req.body));

  delete sizeObject.id;

  db.Size.create({
    ...sizeObject,
  })
    .then((size) => {
      res.status(200).json(size.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single size
exports.getOneSize = async (req, res, next) => {
  let size = await db.size.findOne({
    where: { id: req.params.id },
  });

  if (size) {
    res.status(200).json(size);
  } else {
    res.status(400).json({ message: "Error on getting size" });
  }
};

// Endpoint to update size
exports.modifySize = async ({ body, query, params }, res, next) => {
  const sizeObject = JSON.parse(JSON.stringify(body));

  db.Size.update(
    { ...sizeObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Size.findOne({ where: { id: params.id } })
        .then((size) => {
          res.status(200).json(size);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all size
exports.getAllSizes = async (req, res, next) => {
  db.Size.findAll()
    .then((sizes) => {
      res.status(200).json(sizes);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete size
exports.deleteSize = async (req, res, next) => {
  db.Size.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Size deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
