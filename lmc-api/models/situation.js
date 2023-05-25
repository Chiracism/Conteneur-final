'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Situation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Situation.init({
    numero: DataTypes.STRING,
    taille: DataTypes.INTEGER,
    type: DataTypes.STRING,
    datefabrication: DataTypes.DATE,
    dateinspection: DataTypes.DATE,
    etatconteneur: DataTypes.STRING,
    position: DataTypes.STRING,
    port: DataTypes.STRING,
    observation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Situation',
  });
  return Situation;
};