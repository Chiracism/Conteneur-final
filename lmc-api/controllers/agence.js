const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create agence
exports.createAgence = async (req, res, next) => {
  const agenceObject = JSON.parse(JSON.stringify(req.body));

  delete agenceObject.id;

  db.Agence.create({
    ...agenceObject,
  })
    .then((agence) => {
      res.status(200).json(agence.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single agence
exports.getOneAgence = async (req, res, next) => {
  let agence = await db.Agence.findOne({
    where: { id: req.params.id },
  });

  if (agence) {
    res.status(200).json(agence);
  } else {
    res.status(400).json({ message: "Error on getting agence" });
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
// Endpoint to update agence
exports.modifyAgence = async ({ body, query, params }, res, next) => {
  const agenceObject = JSON.parse(JSON.stringify(body));

  db.Agence.update(
    { ...agenceObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Agence.findOne({ where: { id: params.id } })
        .then((agence) => {
          res.status(200).json(agence);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all agence
exports.getAllAgences = async (req, res, next) => {
  db.Agence.findAll()
    .then((agences) => {
      res.status(200).json(agences);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete agence
exports.deleteAgence = async (req, res, next) => {
  db.Agence.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Agence deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
