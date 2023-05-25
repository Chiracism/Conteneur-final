'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Consultat.init({
    numero: DataTypes.STRING,
    taille: DataTypes.INTEGER,
    type: DataTypes.STRING,
    datefabrication: DataTypes.DATE,
    dateexpiration: DataTypes.DATE,
    dateinspection: DataTypes.DATE,
    etatconteneur: DataTypes.STRING,
    proprietaire: DataTypes.STRING,
    billoflading: DataTypes.STRING,
    navire: DataTypes.STRING,
    eta: DataTypes.DATE,
    client: DataTypes.STRING,
    agence: DataTypes.STRING,
    caution: DataTypes.FLOAT,
    observation: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Consultat',
  });
  return Consultat;
};