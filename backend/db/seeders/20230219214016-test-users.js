'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')

const genUsers = function(num) {
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
    const users = genUsers(10)
    await queryInterface.bulkInsert('Users', users , {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
