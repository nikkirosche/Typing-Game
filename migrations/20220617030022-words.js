'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('words', { 
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    words: {
      allowNull: false,
      type: Sequelize.STRING,
    }, 
});     
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('words');
  }
};