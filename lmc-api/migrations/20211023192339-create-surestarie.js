'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Surestaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      surestariedate: {
        type: Sequelize.DATE
      },
      numero: {
        type: Sequelize.STRING
      },
      exnavire: {
        type: Sequelize.STRING
      },
      datearrivee: {
        type: Sequelize.DATE
      },
      client: {
        type: Sequelize.STRING
      },
      port: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      nombreconteneur: {
        type: Sequelize.INTEGER
      },
      restitutiondate: {
        type: Sequelize.DATE
      },
      cautionversee: {
        type: Sequelize.FLOAT
      },
      nls: {
        type: Sequelize.STRING
      },
      lsdate: {
        type: Sequelize.DATE
      },
      choixtype: {
        type: Sequelize.STRING
      },
      detention: {
        type: Sequelize.INTEGER
      },
      surestarieduree: {
        type: Sequelize.INTEGER
      },
      surestariesduree: {
        type: Sequelize.INTEGER
      },
      frais: {
        type: Sequelize.FLOAT
      },
      facturer: {
        type: Sequelize.FLOAT
      },
      rembourser: {
        type: Sequelize.FLOAT
      },
      total: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Surestaries');
  }
};