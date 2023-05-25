'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Listeconteneurs', {
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
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      billoflading: {
        type: Sequelize.STRING
      },
      navire: {
        type: Sequelize.STRING
      },
      eta: {
        type: Sequelize.STRING
      },
      client: {
        type: Sequelize.STRING
      },
      agence: {
        type: Sequelize.STRING
      },
      caution: {
        type: Sequelize.INTEGER
      },
      observation: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Listeconteneurs');
  }
};