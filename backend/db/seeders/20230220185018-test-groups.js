'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { User } = require('../models')

let options = {}
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

async function genGroups(num) {
  const groups = []
  const users = await User.findAll()
  const userIds = dataGen.utils.getIds(users)
  for(let i = 0; i < num; i++) {
      const group = new dataGen.group(dataGen.utils, { organizerId: userIds[dataGen.utils.getRandom(userIds.length - 1)]})
      groups.push(group)
  }
  return groups
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Groups'
    const groups = await genGroups(5)
    await queryInterface.bulkInsert(options, groups, {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups'
      await queryInterface.bulkDelete(options, null, {});
  }
};
