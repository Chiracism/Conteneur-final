const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create statut
exports.createStatut = async (req, res, next) => {
  const statutObject = JSON.parse(JSON.stringify(req.body));

  delete statutObject.id;

  db.statut.create({
    ...statutObject,
  })
    .then((statut) => {
      res.status(200).json(statut.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single statut
exports.getOneStatut = async (req, res, next) => {
  let statut = await db.statut.findOne({
    where: { id: req.params.id },
  });

  if (statut) {
    res.status(200).json(statut);
  } else {
    res.status(400).json({ message: "Error on getting statut" });
  }
};

// // Endpoint to update client
// exports.modifyClient = async (req, res, next) => {
//   const clientObject = JSON.parse(JSON.stringify(req.query));

//   db.client.update(
//     { ...clientObject },
//     {
//       where: { id: req.params.id },
//     }
//   )
//     .then(async () => {
//       await db.client.findOne({ where: { id: req.params.id } })
//         .then((client) => {
//           res.status(200).json(client);
//         })
//         .catch((error) => res.status(400).json({ error }));
//     })
//     .catch((error) => error.message);
// };
// Endpoint to update statut
exports.modifyStatut = async ({ body, query, params }, res, next) => {
  const statutObject = JSON.parse(JSON.stringify(body));

  db.statut.update(
    { ...statutObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.statut.findOne({ where: { id: params.id } })
        .then((statut) => {
          res.status(200).json(statut);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all statut
exports.getAllStatuts = async (req, res, next) => {
  db.statut.findAll()
    .then((statuts) => {
      res.status(200).json(statuts);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete statut
exports.deleteStatut = async (req, res, next) => {
  db.statut.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "statut deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
