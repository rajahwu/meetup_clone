'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { Group } = require('../models')

async function genVenues() {
  const venues = []
  const groups = await Group.findAll()
  const ids = dataGen.utils.getIds(groups)
  ids.forEach(id => {
     const venue = new dataGen.venue({groupId: id})
     venues.push(venue)
  })
  return venues
}
module.exports = {
  async up (queryInterface, Sequelize) {
    const venues = await genVenues()
      await queryInterface.bulkInsert('Venues', venues, {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Venues', null, {});
  }
};
