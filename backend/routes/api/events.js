const express = require('express');
const router = express.Router();

const dataGen = require('../../db/data_generator')
const { Event, Attendance, Venue, Group, EventImage, User } = require('../../db/models')

router.get('/:eventId/attendees', async (req, res) => {
    const events = await Event.findAll()
    const eventIds = dataGen.utils.getIds(events)

    if(!eventIds.includes(+req.params.eventId)) {
        const err = new Error('Event does not exist')
        err.status = 404
        throw err
    }

    const Attendees = { Attendees: [] }

    let attendees = await Attendance.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt', 'eventId']},
        where: { eventId: req.params.eventId }
    })

    attendees = JSON.parse(JSON.stringify(attendees))

    for(let attendee of attendees) {
        const user = await User.findByPk(attendee.userId)
        const { id, firstName, lastName } = user
        attendee = Object.assign(attendee, {
            id,
            firstName,
            lastName,
            Attendance: {
                status: attendee.status
            }
        })
        delete attendee.userId
        delete attendee.status

        Attendees.Attendees.push(attendee)
    }


    res.json(Attendees)
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
    const Events = { Events: [] }

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

    Events.Events = [...events]

    res.json(Events)
})





module.exports = router