'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { Group } = require('../models')

let options = {}
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

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
    options.tableName = 'Venues'
    const venues = await genVenues()
      await queryInterface.bulkInsert(options, venues, {});
  },

  async down (queryInterface, Sequelize) {
      options.tableName = 'Venues'
      await queryInterface.bulkDelete(options, null, {});
  }
};
