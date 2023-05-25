const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create client
exports.createClient = async (req, res, next) => {
  const clientObject = JSON.parse(JSON.stringify(req.body));

  delete clientObject.id;

  db.client.create({
    ...clientObject,
  })
    .then((client) => {
      res.status(200).json(client.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single client
exports.getOneClient = async (req, res, next) => {
  let client = await db.client.findOne({
    where: { id: req.params.id },
  });

  if (client) {
    res.status(200).json(client);
  } else {
    res.status(400).json({ message: "Error on getting client" });
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
// Endpoint to update client
exports.modifyClient = async ({ body, query, params }, res, next) => {
  const clientObject = JSON.parse(JSON.stringify(body));

  db.client.update(
    { ...clientObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.client.findOne({ where: { id: params.id } })
        .then((client) => {
          res.status(200).json(client);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all client
exports.getAllClients = async (req, res, next) => {
  db.client.findAll()
    .then((clients) => {
      res.status(200).json(clients);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete client
exports.deleteClient = async (req, res, next) => {
  db.client.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Client deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
