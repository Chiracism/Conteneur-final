const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create categorie
exports.createCategorie = async (req, res, next) => {
  const categorieObject = JSON.parse(JSON.stringify(req.body));

  delete categorieObject.id;

  db.Categorie.create({
    ...categorieObject,
  })
    .then((categorie) => {
      res.status(200).json(categorie.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single categorie
exports.getOneCategorie = async (req, res, next) => {
  let categorie = await db.Categorie.findOne({
    where: { id: req.params.id },
  });

  if (categorie) {
    res.status(200).json(categorie);
  } else {
    res.status(400).json({ message: "Error on getting categorie" });
  }
};

// Endpoint to update categorie
exports.modifyCategorie = async ({ body, query, params }, res, next) => {
  const categorieObject = JSON.parse(JSON.stringify(body));

  db.Categorie.update(
    { ...categorieObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Categorie.findOne({ where: { id: params.id } })
        .then((categorie) => {
          res.status(200).json(categorie);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all categories
exports.getAllCategories = async (req, res, next) => {
  db.Categorie.findAll()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete categorie
exports.deleteCategorie = async (req, res, next) => {
  db.Categorie.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Categorie deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
