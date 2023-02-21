const express = require('express');
const { utils, group } = require('../db/data_generator');
const router = express.Router();

const dataGen = require('../db/data_generator');
const EventImageData = require('../db/data_generator/EventImageData');
const { User, Group, GroupImage, Venue, Event, EventImage } = require('../db/models')

// async function genEventImages() {
//   const eventImages = []
//   const events = await Event.findAll()
//   const ids = dataGen.utils.getIds(events)
//   ids.forEach(id => {
//     const event = eventImages.push(new dataGen.eventImage(dataGen.utils, {eventId: id}))
//     eventImages.push(event)
//   })
//   return eventImages
// }


router.get('/', async (req, res) => {
 const events = await EventImage.findAll()
    res.json(events)
})

module.exports = router