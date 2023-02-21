'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { Group, Venue } = require('../models')

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
    const events = await genEvents()
      await queryInterface.bulkInsert('Events', events , {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Events', null, {});
  }
};
