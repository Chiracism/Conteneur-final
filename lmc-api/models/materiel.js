'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materiel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Materiel.init({
    index: DataTypes.STRING,
    name: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    devise: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materiel',
  });
  return Materiel;
};