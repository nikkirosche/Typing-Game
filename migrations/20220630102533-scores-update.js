"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("scores", "updated_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });

  },

  async down(queryInterface, Sequelize) {
 
    await queryInterface.removeColumn("scores", "updated_at");

  },
};