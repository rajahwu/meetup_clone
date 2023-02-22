const express = require('express');
const router = express.Router();

const dataGen = require('../../db/data_generator')
const { Event, Attendance, Venue, Group, EventImage } = require('../../db/models')

router.get('/:eventId/attendees', async (req, res) => {
    const attendess = await Attendance.findAll({
        where: { eventId: req.params.eventId }
    })

    res.json(attendess)
})

router.get('/:eventId', async (req, res) => {
    const events = await Event.findAll()
    const eventIds = dataGen.utils.getIds(events)

    if(!eventIds.includes(+req.params.eventId)) {
        const err = new Error('Event does not exist')
        err.status = 404
        throw err
    }

    let event = await Event.findByPk(req.params.eventId, {
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
            {model: Group, attributes: ['id', 'name', 'private', 'city', 'state']}, 
            {model: Venue, attributes: {exclude: ['createdAt', 'updatedAt', 'groupId']}}, 
            {model: EventImage, attributes: ['id', 'url', 'preview']}
        ]
    })

        const numAttending = await Attendance.count({
            where: { eventId: req.params.eventId }
        })

    event = JSON.parse(JSON.stringify(event))
    event.numAttending = numAttending


    res.json(event)
})

router.get('/', async (req, res) => {

    let events = await Event.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt', 'description', 'price', 'capacity']},
        include: [
            { model: Venue, attributes: ['id', 'city', 'state'] },
            { model: Group, attributes: ['id', 'name', 'city', 'state'] }
        ],
    })

    const eventIds = dataGen.utils.getIds(events)
    events = JSON.parse(JSON.stringify(events))
 
    for(let i = 0; i < eventIds.length; i++) {
        const numAttending = await Attendance.count({
            where: { eventId: eventIds[i] }
        })

        let previewImage = await EventImage.findOne({
            where: { eventId: eventIds[i]}
        })

        previewImage = JSON.parse(JSON.stringify(previewImage))
        events[i].numAttending = numAttending
        events[i].previewImage = previewImage['url']
    }

    res.json(events)
})





module.exports = router