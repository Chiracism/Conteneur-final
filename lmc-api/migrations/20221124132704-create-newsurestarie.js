'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Newsurestaries', {
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
      navire: {
        type: Sequelize.STRING
      },
      port: {
        type: Sequelize.STRING
      },
      typeofchoix: {
        type: Sequelize.STRING
      },
      datearrivee: {
        type: Sequelize.DATE
      },
      client: {
        type: Sequelize.STRING
      },
      caution: {
        type: Sequelize.INTEGER
      },
      daterestitution: {
        type: Sequelize.DATE
      },
      detention: {
        type: Sequelize.INTEGER
      },
      duree: {
        type: Sequelize.INTEGER
      },
      durees: {
        type: Sequelize.INTEGER
      },
      rembourser: {
        type: Sequelize.FLOAT
      },
      montantafacture: {
        type: Sequelize.FLOAT
      },
      statut: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Newsurestaries');
  }
};