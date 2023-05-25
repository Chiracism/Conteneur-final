const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create ListeConteneur
exports.createListeConteneur = async (req, res, next) => {
  const listeconteneurObject = JSON.parse(JSON.stringify(req.body));

  delete listeconteneurObject.id;

  db.Listeconteneur.create({
    ...listeconteneurObject,
  })
    .then((listeConteneur) => {
      res.status(200).json(listeConteneur.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single ListeConteneur
exports.getOneListeConteneur = async (req, res, next) => {
  let listeConteneur = await db.Listeconteneur.findOne({
    where: { id: req.params.id },
  });

  if (listeConteneur) {
    res.status(200).json(listeConteneur);
  } else {
    res.status(400).json({ message: "Error on getting liste Conteneur" });
  }
};

// Endpoint to update ListeConteneur
exports.modifyListeConteneur = async ({ body, query, params }, res, next) => {
  const listeConteneurbject = JSON.parse(JSON.stringify(body));

  db.Listeconteneur.update(
    { ...listeConteneurObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Listeconteneur.findOne({ where: { id: params.id } })
        .then((listeConteneur) => {
          res.status(200).json(listeConteneur);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all ListeConteneurs
exports.getAllListeConteurs = async (req, res, next) => {
  db.Listeconteneur.findAll()
    .then((listeConteneur) => {
      res.status(200).json(listeConteneur);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete ListeConteneur
exports.deleteListeConteneur = async (req, res, next) => {
  db.listeConteneur.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "ListeConteneur deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
