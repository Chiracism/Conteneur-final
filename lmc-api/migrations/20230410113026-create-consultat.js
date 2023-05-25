'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Consultats', {
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
      datefabrication: {
        type: Sequelize.DATE
      },
      dateexpiration: {
        type: Sequelize.DATE
      },
      dateinspection: {
        type: Sequelize.DATE
      },
      etatconteneur: {
        type: Sequelize.STRING
      },
      proprietaire: {
        type: Sequelize.STRING
      },
      billoflading: {
        type: Sequelize.STRING
      },
      navire: {
        type: Sequelize.STRING
      },
      eta: {
        type: Sequelize.DATE
      },
      client: {
        type: Sequelize.STRING
      },
      agence: {
        type: Sequelize.STRING
      },
      caution: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Consultats');
  }
};