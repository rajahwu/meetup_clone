const express = require('express');
const { utils, group } = require('../db/data_generator');
const router = express.Router();

const dataGen = require('../db/data_generator')
const { User, Group, GroupImage, Venue, Event } = require('../db/models')


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

router.get('/', async (req, res) => {
 const events = await Event.findAll()
    res.json(events)
})

module.exports = router