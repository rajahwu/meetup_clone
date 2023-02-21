'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { Event, Group, User } = require('../models')


async function genAttendances() {
  const attendances = []
  const events = await Event.findAll({
    include: {model: Group},
  })
  
  const ids = []
  events.forEach(event => {
    const eventId = event.id
    const groupId = event.Group.id
    ids.push({eventId, groupId})
  })

const groupUsers = []
 for(const id of ids) {
   let groups = await Group.findAll({
       where: {id: id.groupId},
      include: [{ model: User, attributes: ['id']}],
      attributes: ['id']
     })
    groupUsers.push(JSON.parse(JSON.stringify(groups)))
 }

const attendancesIds = []
groupUsers.forEach(group => {
    attendancesIds.push([group[0].id, group[0].User.id])    
})
  for(const id of attendancesIds) {
    const eventId = id[0]
    const userId = id[1]
    const attendee = new dataGen.attendance(dataGen.utils, {eventId, userId})
    attendances.push(attendee)
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
