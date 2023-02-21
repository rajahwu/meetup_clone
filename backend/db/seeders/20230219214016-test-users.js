'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
let options = {}
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

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
    options.tableName = 'Users'
    const users = genUsers(10)
    await queryInterface.bulkInsert(options, users , {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
     await queryInterface.bulkDelete(options, null, {});
  }
};
