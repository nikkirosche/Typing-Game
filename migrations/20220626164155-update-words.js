'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('words', 'score_id');
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('words');
     
  }
};
