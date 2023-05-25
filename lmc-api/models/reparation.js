'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reparation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reparation.init({
    numero: DataTypes.STRING,
    datedernierereparation: DataTypes.DATE,
    typeconteneur: DataTypes.STRING,
    tailleconteneur: DataTypes.STRING,
    proprietaireid: DataTypes.STRING,
    paysname: DataTypes.STRING,
    taux: DataTypes.FLOAT,
    heure: DataTypes.FLOAT,
    materielid: DataTypes.STRING,
    total: DataTypes.FLOAT,
    numerorecu: DataTypes.STRING,
    societereparation: DataTypes.STRING,
    societelocation: DataTypes.STRING,
    site: DataTypes.STRING,
    datederniereinspection: DataTypes.DATE,
    societe: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reparation',
  });
  return Reparation;
};