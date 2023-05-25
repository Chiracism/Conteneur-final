'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mouvement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Mouvement.init({
    number: DataTypes.STRING,
    site: DataTypes.STRING,
    soussite: DataTypes.STRING,
    datemouvement: DataTypes.DATE,
    exnavire: DataTypes.STRING,
    datearrivee: DataTypes.DATE,
    port: DataTypes.STRING,
    client: DataTypes.STRING,
    etatconteneur: DataTypes.STRING,
    typeconteneur: DataTypes.STRING,
    size: DataTypes.STRING,
    nombreconteneur: DataTypes.INTEGER,
    observation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mouvement',
  });
  return Mouvement;
};