'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MasterFiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      namenavire: {
        type: Sequelize.STRING
      },
      paysid: {
        type: Sequelize.STRING
      },
      typeconteneurid: {
        type: Sequelize.STRING
      },
      tailleconteneurid: {
        type: Sequelize.STRING
      },
      materielid: {
        type: Sequelize.STRING
      },
      proprietaireid: {
        type: Sequelize.STRING
      },
      etatconteneurid: {
        type: Sequelize.STRING
      },
      constructeur: {
        type: Sequelize.STRING
      },
      datefabrication: {
        type: Sequelize.DATE
      },
      dateentrerservice: {
        type: Sequelize.DATE
      },
      datederniereinspection: {
        type: Sequelize.DATE
      },
      valeurassuree: {
        type: Sequelize.FLOAT
      },
      deviseid: {
        type: Sequelize.STRING
      },
      societeinspection: {
        type: Sequelize.STRING
      },
      dernierconstat: {
        type: Sequelize.STRING
      },
      siteid: {
        type: Sequelize.STRING
      },
      soussiteid: {
        type: Sequelize.STRING
      },
      datemouvement: {
        type: Sequelize.DATE
      },
      observation: {
        type: Sequelize.STRING
      },
      client: {
        type: Sequelize.STRING
      },
      dateoperation: {
        type: Sequelize.DATE
      },
      montant: {
        type: Sequelize.FLOAT
      },
      numerorecu: {
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
    await queryInterface.dropTable('MasterFiles');
  }
};