const express = require('express');
const { ForeignKeyConstraintError } = require('sequelize');
const { utils, group } = require('../db/data_generator');
const router = express.Router();

const dataGen = require('../db/data_generator');
const EventImageData = require('../db/data_generator/EventImageData');
const { User, Group, GroupImage, Venue, Event, EventImage } = require('../db/models')

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

router.get('/', async (req, res) => {
  const attendances = await genAttendances()
  
    res.json(attendances)
})

module.exports = router