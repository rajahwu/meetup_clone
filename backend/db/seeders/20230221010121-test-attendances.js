'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { Event, Group, User } = require('../models')

async function genAttendances() {
  const attendances = []
  const events = await Event.findAll()
  const users = await User.findAll()
  const eventIds = dataGen.utils.getIds(events)
  const userIds = dataGen.utils.getIds(users)
  

  for(const id of eventIds) {
    for(let i = 0; i < 3; i++) {
      const eventId = id
      const userId = userIds[dataGen.utils.getRandom(userIds.length - 1)]
      const attendee = new dataGen.attendance(dataGen.utils, {eventId, userId})
      attendances.push(attendee)
    }
  }
  return attendances
} 

module.exports = {
  async up (queryInterface, Sequelize) {
    const attendees = await genAttendances()
      await queryInterface.bulkInsert('Attendances', attendees, {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Attendances', null, {});
  }
};
