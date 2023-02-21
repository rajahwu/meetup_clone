'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { User, Group } = require('../models')

async function genMemberships(num) {
  const memberships = []
  const users = await User.findAll()
  const groups = await Group.findAll()
  const userIds = dataGen.utils.getIds(users)
  const groupIds = dataGen.utils.getIds(groups)
  for( let i = 0; i < num; i++ ) {
      const membership = new dataGen.membership(dataGen.utils, {
          userId: userIds[dataGen.utils.getRandom(userIds.length - 1)],
          groupId: groupIds[dataGen.utils.getRandom(groupIds.length - 1)]
      })
      memberships.push(membership)
  }
  return memberships
}


module.exports = {
  async up (queryInterface, Sequelize) {
    const memberships = await genMemberships(5)
     await queryInterface.bulkInsert('Memberships', memberships, {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Memberships', null, {});
  }
};
