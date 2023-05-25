'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mouvements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      site: {
        type: Sequelize.STRING
      },
      soussite: {
        type: Sequelize.STRING
      },
      datemouvement: {
        type: Sequelize.DATE
      },
      exnavire: {
        type: Sequelize.STRING
      },
      datearrivee: {
        type: Sequelize.DATE
      },
      port: {
        type: Sequelize.STRING
      },
      client: {
        type: Sequelize.STRING
      },
      etatconteneur: {
        type: Sequelize.STRING
      },
      typeconteneur: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      nombreconteneur: {
        type: Sequelize.INTEGER
      },
      observation: {
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
    await queryInterface.dropTable('Mouvements');
  }
};