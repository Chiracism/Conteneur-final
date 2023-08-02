const db = require("../models/index");
const { Op } = require("sequelize");

// Endpoint to get all clients
exports.getAllStats = async (req, res, next) => {
  try {
    const UserStat = await db.User.count();
    const clientStat = await db.client.count();
    const vesselStat = await db.Navire.count();
    const pcStat = await db.Newsurestarie.count();
    const agenceStat = await db.Newmasterfile.count();

    res.status(200).json({
      UserStat,
      clientStat,
      vesselStat,
      pcStat,
      agenceStat,
    });
  } catch (e) {
    console.log("Error with datas stats : ", e.message);
  }
};
