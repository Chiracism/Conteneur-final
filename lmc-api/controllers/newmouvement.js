const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create mouvement
exports.createMouvement = async (req, res, next) => {
  const newmouvementObject = JSON.parse(JSON.stringify(req.body));
  // console.log('newmouvementObject : ', newmouvementObject);

  delete newmouvementObject.id;

  db.Newmouvement.create({
    ...newmouvementObject,
  })
    .then((newmouvement) => {
      res.status(200).json(newmouvement.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single mouvement
exports.getOneMouvement = async (req, res, next) => {
  let newmouvement = await db.Newmouvement.findOne({
    where: { id: req.params.id },
  });

  if (newmouvement) {
    res.status(200).json(newmouvementmouvement);
  } else {
    res.status(400).json({ message: "Error on getting mouvement" });
  }
};

// Endpoint to update mouvement
exports.modifyMouvement = async ({ body, query, params }, res, next) => {
  const newmouvementObject = JSON.parse(JSON.stringify(body));

  db.Newmouvement.update(
    { ...newmouvementObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Newmouvement.findOne({ where: { id: params.id } })
        .then((newmouvement) => {
          res.status(200).json(newmouvement);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all mouvement
exports.getAllMouvements = async (req, res, next) => {
  db.Newmouvement.findAll()
    .then((newmouvements) => {
      res.status(200).json(newmouvements);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete mouvement
exports.deleteMouvement = async (req, res, next) => {
  db.Newmouvement.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Mouvement deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
