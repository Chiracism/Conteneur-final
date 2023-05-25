const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create position
exports.createPosition = async (req, res, next) => {
  const positionObject = JSON.parse(JSON.stringify(req.body));

  delete positionObject.id;

  db.Position.create({
    ...positionObject,
  })
    .then((position) => {
      res.status(200).json(position.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single position
exports.getOnePosition = async (req, res, next) => {
  let position = await db.Position.findOne({
    where: { id: req.params.id },
  });

  if (position) {
    res.status(200).json(position);
  } else {
    res.status(400).json({ message: "Error on getting position" });
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
// Endpoint to update position
exports.modifyPosition = async ({ body, query, params }, res, next) => {
  const positionObject = JSON.parse(JSON.stringify(body));

  db.Position.update(
    { ...positionObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Position.findOne({ where: { id: params.id } })
        .then((position) => {
          res.status(200).json(position);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all position
exports.getAllPositions = async (req, res, next) => {
  db.Position.findAll()
    .then((positions) => {
      res.status(200).json(positions);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete position
exports.deletePosition = async (req, res, next) => {
  db.Position.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Position deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
