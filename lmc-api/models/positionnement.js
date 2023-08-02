'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class positionnement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  positionnement.init({
    numero: DataTypes.STRING,
    taille: DataTypes.INTEGER,
    type: DataTypes.STRING,
    position: DataTypes.STRING,
    datedepart: DataTypes.DATE,
    port: DataTypes.STRING,
    navire: DataTypes.STRING,
    exportat: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'positionnement',
  });
  return positionnement;
};