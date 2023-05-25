'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reparations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero: {
        type: Sequelize.STRING
      },
      datedernierereparation: {
        type: Sequelize.DATE
      },
      typeconteneur: {
        type: Sequelize.STRING
      },
      tailleconteneur: {
        type: Sequelize.STRING
      },
      proprietaireid: {
        type: Sequelize.STRING
      },
      paysname: {
        type: Sequelize.STRING
      },
      taux: {
        type: Sequelize.FLOAT
      },
      heure: {
        type: Sequelize.FLOAT
      },
      materielid: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.FLOAT
      },
      numerorecu: {
        type: Sequelize.STRING
      },
      societereparation: {
        type: Sequelize.STRING
      },
      societelocation: {
        type: Sequelize.STRING
      },
      site: {
        type: Sequelize.STRING
      },
      datederniereinspection: {
        type: Sequelize.DATE
      },
      societe: {
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
    await queryInterface.dropTable('Reparations');
  }
};