const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create NewMasterFile
exports.createNewMasterFile = async (req, res, next) => {
  const newMasterFileObject = JSON.parse(JSON.stringify(req.body));

  delete newMasterFileObject.id;

  db.Newmasterfile.create({
    ...newMasterFileObject,
  })
    .then((newMasterFile) => {
      res.status(200).json(newMasterFile.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single NewMasterFile
exports.getOneNewMasterFile = async (req, res, next) => {
  let newMasterFile = await db.Newmasterfile.findOne({
    where: { id: req.params.id },
  });

  if (newMasterFile) {
    res.status(200).json(newMasterFile);
  } else {
    res.status(400).json({ message: "Error on getting NewMasterFile" });
  }
};

// Endpoint to update NewMasterFile
exports.modifyNewMasterFile = async ({ body, query, params }, res, next) => {
  const newMasterFileObject = JSON.parse(JSON.stringify(body));

  db.Newmasterfile.update(
    { ...newMasterFileObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Newmasterfile.findOne({ where: { id: params.id } })
        .then((newMasterFile) => {
          res.status(200).json(newMasterFile);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all newMasterFile
exports.getAllNewMasterFiles = async (req, res, next) => {
  db.Newmasterfile.findAll()
    .then((newMasterFiles) => {
      res.status(200).json(newMasterFiles);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete NewMasterFile
exports.deleteNewMasterFile = async (req, res, next) => {
  db.Newmasterfile.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "NewMasterFile deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
