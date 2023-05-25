'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Surestarie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Surestarie.init({
    surestariedate: DataTypes.DATE,
    numero: DataTypes.STRING,
    exnavire: DataTypes.STRING,
    datearrivee: DataTypes.DATE,
    client: DataTypes.STRING,
    port: DataTypes.STRING,
    size: DataTypes.STRING,
    nombreconteneur: DataTypes.INTEGER,
    restitutiondate: DataTypes.DATE,
    cautionversee: DataTypes.FLOAT,
    nls: DataTypes.STRING,
    lsdate: DataTypes.DATE,
    choixtype: DataTypes.STRING,
    detention: DataTypes.INTEGER,
    surestarieduree: DataTypes.INTEGER,
    surestariesduree: DataTypes.INTEGER,
    frais: DataTypes.FLOAT,
    facturer: DataTypes.FLOAT,
    rembourser: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Surestarie',
  });
  return Surestarie;
};