const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to create client
exports.createSite = async (req, res, next) => {
  const siteObject = JSON.parse(JSON.stringify(req.body));

  delete siteObject.id;

  db.Site.create({
    ...siteObject,
  })
    .then((site) => {
      res.status(200).json(site.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single site
exports.getOneSite = async (req, res, next) => {
  let site = await db.site.findOne({
    where: { id: req.params.id },
  });

  if (site) {
    res.status(200).json(site);
  } else {
    res.status(400).json({ message: "Error on getting site" });
  }
};

// Endpoint to update site
exports.modifySite = async ({ body, query, params }, res, next) => {
  const siteObject = JSON.parse(JSON.stringify(body));

  db.Site.update(
    { ...siteObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.Site.findOne({ where: { id: params.id } })
        .then((site) => {
          res.status(200).json(site);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all sites
exports.getAllSites = async (req, res, next) => {
  db.Site.findAll()
    .then((sites) => {
      res.status(200).json(sites);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete site
exports.deleteSite = async (req, res, next) => {
  db.Site.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: "Site deleted !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
