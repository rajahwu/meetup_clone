'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')

const users = function(num) {
  const users = []
  for(let i = 0; i < num; i++) {
    const user = new dataGen.user()
    Object.assign({}, user)
    users.push(user)
  }
  return users
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', users(5) , {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
