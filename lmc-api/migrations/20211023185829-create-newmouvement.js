'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Newmouvements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero: {
        type: Sequelize.STRING
      },
      taille: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      bl: {
        type: Sequelize.STRING
      },
      navire: {
        type: Sequelize.STRING
      },
      eta: {
        type: Sequelize.DATE
      },
      contenu: {
        type: Sequelize.STRING
      },
      poids: {
        type: Sequelize.STRING
      },
      client: {
        type: Sequelize.STRING
      },
      numeromemo: {
        type: Sequelize.STRING
      },
      agence: {
        type: Sequelize.STRING
      },
      caution: {
        type: Sequelize.FLOAT
      },
      destination: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Newmouvements');
  }
};