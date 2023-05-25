'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Newsurestarie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Newsurestarie.init({
    numero: DataTypes.STRING,
    taille: DataTypes.INTEGER,
    type: DataTypes.STRING,
    navire: DataTypes.STRING,
    port: DataTypes.STRING,
    typeofchoix: DataTypes.STRING,
    datearrivee: DataTypes.DATE,
    client: DataTypes.STRING,
    caution: DataTypes.INTEGER,
    daterestitution: DataTypes.DATE,
    detention: DataTypes.INTEGER,
    duree: DataTypes.INTEGER,
    durees: DataTypes.INTEGER,
    rembourser: DataTypes.FLOAT,
    montantafacture: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Newsurestarie',
  });
  return Newsurestarie;
};