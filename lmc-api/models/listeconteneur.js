'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listeconteneur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Listeconteneur.init({
    numero: DataTypes.STRING,
    taille: DataTypes.INTEGER,
    type: DataTypes.STRING,
    billoflading: DataTypes.STRING,
    navire: DataTypes.STRING,
    eta: DataTypes.DATE,
    client: DataTypes.STRING,
    agence: DataTypes.STRING,
    caution: DataTypes.INTEGER,
    observation: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Listeconteneur',
  });
  return Listeconteneur;
};
