'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Newmouvement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Newmouvement.init({
    numero: DataTypes.STRING,
    taille: DataTypes.INTEGER,
    type: DataTypes.STRING,
    bl: DataTypes.STRING,
    navire: DataTypes.STRING,
    eta: DataTypes.DATE,
    contenu: DataTypes.STRING,
    poids: DataTypes.STRING,
    client: DataTypes.STRING,
    numeromemo: DataTypes.STRING,
    agence: DataTypes.STRING,
    caution: DataTypes.FLOAT,
    destination: DataTypes.STRING,
    dates: DataTypes.DATE,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Newmouvement',
  });
  return Newmouvement;
};