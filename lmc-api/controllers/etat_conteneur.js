const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create etat conteneur
exports.createEtatConteneur = async (req, res, next) => {
  const etatconteneurObject = JSON.parse(JSON.stringify(req.body));

  delete etatconteneurObject.id;

  db.Etat_Conteneur.create({
    ...etatconteneurObject,
  })
    .then((etatconteneur) => {
      res.status(200).json(etatconteneur.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single Etat Container
exports.getOneEtatConteneur = async (req, res, next) => {
  let etatconteneur = await db.etatconteneur.findOne({
    where: { id: req.params.id },
  });

  if (etatconteneur) {
    res.status(200).json(etatconteneur);
  } else {
    res.status(400).json({ message: "Error on getting Etat Conteneur " });
  }
};

// Endpoint to update Etat Container
exports.modifyEtatConteneur = async ({ body, query, params }, res, next) => {
 const etatconteneurObject = JSON.parse(JSON.stringify(body));

  db.Etat_Conteneur.update(
    { ...etatconteneurObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Etat_Conteneur.findOne({ where: { id: params.id } })
        .then((etatconteneur) => {
          res.status(200).json(etatconteneur);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all State Container
exports.getAllEtatConteneurs = async (req, res, next) => {
  db.Etat_Conteneur.findAll()
    .then((etatconteneurs) => {
      res.status(200).json(etatconteneurs);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete etat container
exports.deleteEtatConteneur = async (req, res, next) => {
  db.Etat_Conteneur.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
    res.status(200).json({ message: "Etat Container deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
