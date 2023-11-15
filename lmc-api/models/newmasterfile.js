'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Newmasterfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Newmasterfile.init({
    numero: DataTypes.STRING,
    taille: DataTypes.INTEGER,
    type: DataTypes.STRING,
    datefabrication: DataTypes.DATE,
    dateexpiration: DataTypes.DATE,
    dateinspection: DataTypes.DATE,
    etatconteneur: DataTypes.STRING,
    proprietaire: DataTypes.STRING,
    // etat: DataTypes.DATE,
    observation: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Newmasterfile',
  });
  return Newmasterfile;
};