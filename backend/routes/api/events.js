const express = require('express');
const { attendance } = require('../../db/data_generator');
const router = express.Router();

const dataGen = require('../../db/data_generator')
const { Event, Attendance, Venue, Group, EventImage, User, Membership } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

router.get('/:eventId/attendees', async (req, res) => {
    const events = await Event.findAll()
    const eventIds = dataGen.utils.getIds(events)

    if(!eventIds.includes(+req.params.eventId)) {
        const err = new Error('Event does not exist')
        err.statusCode = 404
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

router.post('/:eventId/attendance', [restoreUser, requireAuth], async (req, res) => {

    const event = await Event.findByPk(req.params.eventId)

    if(!event) {
        const err = new Error('Event couldn\'t be found')
        err.statusCode = 404
        throw err
    }

    const { user } = req
    const attendaceStatus = await Attendance.findOne({
        where: {
            userId: user.id,
            eventId: req.params.eventId
        }
    })

    if(attendaceStatus) {
        const err = new Error('')
        err.message = attendaceStatus.status === "pending" 
        ? "Attendance has already been requested" 
        : "User is already an attendee of the event"
        err.statusCode = 400
        throw err
    }

    const newAttendance = await Attendance.create({
        eventId: req.params.eventId,
        userId: user.id,
        status: "pending"
    })
    const { userId, status } = newAttendance

    res.json({
        userId,
        status
    })
})

router.put('/:eventId/attendance', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req
    
    const event = await Event.findByPk(req.params.eventId)

    if(!event) {
        const err = new Error('Event couldn\'t be found')
        err.statusCode = 404
        throw err
    }

    const group = await Group.findOne({
        where: {id: event.groupId}
    })

    const membershipStatus = Membership.findOne({
        where: {groupId: group.id, status: "co-host"}
    })
   
    if(group.organizerId !== user.id && !membershipStatus) {
        throw new Error('Must be event owner')
    }

    const { userId, status } = req.body

    if(status === 'pending') {
        const err = new Error('Cannot change an attendance status to pending')
        err.statusCode = 400
        throw err
    }

    let attendance = await Attendance.findOne({
        where: {userId: userId, eventId: req.params.eventId}
    })
    
    if(!attendance) {
        const err = new Error('Attendance between the user and the event does not exist')
        err.statusCode = 404
        throw err
    }

    attendance = await attendance.update({status})
    console.log(attendance.id)

    res.json({
        id: attendance.id,
        eventId: attendance.eventId,
        userId: attendance.userId,
        status: attendance.status
    })
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

router.use((err, req, res, next) => {
    res.json({
        message: err.message,
        statusCode: err.statusCode,
        errors: err.errors
    })
})

module.exports = router