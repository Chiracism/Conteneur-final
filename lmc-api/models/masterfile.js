'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MasterFile.init({
    number: DataTypes.STRING,
    namenavire: DataTypes.STRING,
    paysid: DataTypes.STRING,
    typeconteneurid: DataTypes.STRING,
    tailleconteneurid: DataTypes.STRING,
    materielid: DataTypes.STRING,
    proprietaireid: DataTypes.STRING,
    etatconteneurid: DataTypes.STRING,
    constructeur: DataTypes.STRING,
    datefabrication: DataTypes.DATE,
    dateentrerservice: DataTypes.DATE,
    datederniereinspection: DataTypes.DATE,
    valeurassuree: DataTypes.FLOAT,
    deviseid: DataTypes.STRING,
    societeinspection: DataTypes.STRING,
    dernierconstat: DataTypes.STRING,
    siteid: DataTypes.STRING,
    soussiteid: DataTypes.STRING,
    datemouvement: DataTypes.DATE,
    observation: DataTypes.STRING,
    client: DataTypes.STRING,
    dateoperation: DataTypes.DATE,
    montant: DataTypes.FLOAT,
    numerorecu: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MasterFile',
  });
  return MasterFile;
};