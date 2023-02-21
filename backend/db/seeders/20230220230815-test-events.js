'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { Group, Venue } = require('../models')

let options = {}
if(process.env.NODE_ENV === 'production') {
  options.schema = procees.env.SCHEMA;
}

async function genEvents() {
  const events = []
  let groups = await Group.findAll({
    include: { model: Venue }
  })

  groups = JSON.parse(JSON.stringify(groups))
  for(let i = 0; i < groups.length - 1; i++) {
    const foreginKeys = {
      groupId: groups[i].id,
      venueId: groups[i].Venues[0].id
    }
    const event = new dataGen.event(dataGen.utils, foreginKeys)
    events.push(event)
  }
    return events
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Events'
    const events = await genEvents()
      await queryInterface.bulkInsert(options, events , {});
  },

  async down (queryInterface, Sequelize) {
      options.tableName = 'Events'
      await queryInterface.bulkDelete(options, null, {});
  }
};
