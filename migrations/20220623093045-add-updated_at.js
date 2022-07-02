"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("friends", "updated_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("words", "updated_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("words", "created_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn("users", "updated_at");
    // await queryInterface.removeColumn("score", "updated_at");
    await queryInterface.removeColumn("friends", "updated_at");
    await queryInterface.removeColumn("words", "updated_at");
    await queryInterface.removeColumn("words", "created_at");
  },
};



