const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create masterfile
exports.createMasterfile = async (req, res, next) => {
  const masterfileObject = JSON.parse(JSON.stringify(req.body));

  delete masterfileObject.id;

  db.MasterFile.create({
    ...masterfileObject,
  })
    .then((masterfile) => {
      res.status(200).json(masterfile.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single masterfile
exports.getOneMasterFile = async (req, res, next) => {
  let masterfile = await db.MasterFile.findOne({
    where: { id: req.params.id },
  });

  if (masterfile) {
    res.status(200).json(masterfile);
  } else {
    res.status(400).json({ message: "Error on getting masterfile" });
  }
};

// Endpoint to update masterfile
exports.modifyMasterfile = async ({ body, query, params }, res, next) => {
  const masterfileObject = JSON.parse(JSON.stringify(body));

  db.MasterFile.update(
    { ...masterfileObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.MasterFile.findOne({ where: { id: params.id } })
        .then((masterfile) => {
          res.status(200).json(masterfile);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all Masterfiles
exports.getAllMasterfiles = async (req, res, next) => {
  db.MasterFile.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((masterfiles) => {
      res.status(200).json(masterfiles);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete client
exports.deleteMasterfile = async (req, res, next) => {
  db.MasterFile.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Masterfile deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
