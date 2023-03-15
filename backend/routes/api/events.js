const express = require('express');
const router = express.Router();

const dataGen = require('../../db/data_generator')
const { Event, Attendance, Venue, Group, EventImage, User, Membership } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

router.post('/:eventId/images',[restoreUser, requireAuth], async (req, res) => {
    const { user } = req

    const event = await Event.findByPk(req.params.eventId)
    
    if(!event) {
        const err = new Error('Group couldn\'t be found')
        err.statusCode = 404
        throw err
    }

    const group = await Group.findOne({
        where: {id: event.groupId}
    })
    const membershipStatus = Membership.findAll({
        where: { groupId: group.id, status: 'co-host', userId: user.id }
    })

    if(group.organizerId !== user.id && membershipStatus.id !== user.id) {
        const err = new Error('Forbidden')
        err.statusCode = 403
        throw err
    }
    
    const { url, preview } = req.body
    const newEventImage = await EventImage.create({
        eventId: event.id,
        url,
        preview
    })

    res.json({
        id: newEventImage.id,
        url: newEventImage.url,
        preview: newEventImage.preview
    })
})

router.get('/:eventId/attendees', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req

    const event = await Event.findByPk(req.params.eventId)
    if(!event) {
        const err = new Error('Event does not exist')
        err.statusCode = 404
        throw err
    }

    console.log(event)
    const group = await Group.findByPk(event.groupId)
    
    const membershipStatus = await Membership.findAll({
        where: { groupId: group.id, status: 'co-host', userId: user.id }
    })
    
    if(group.organizerId !== user.id && !membershipStatus) {
        const err = new Error('Forbidden')
        err.statusCode = 403
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

    const membershipStatus = await Membership.findOne({
        where: {groupId: event.groupId, userId: user.id}
    })

    if(!membershipStatus || membershipStatus.status === 'pending') {
        const err = new Error('Forbidden')
        err.statusCode = 403
        throw err
    }

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

router.delete('/:eventId/attendance', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req
    
    const event = await Event.findByPk(req.params.eventId)
    
    if(!event) {
        const err = new Error('Event couldn\'t be found')
        err.statusCode = 404
        throw err
    }

    const group = await Group.findByPk(event.groupId)

    const { userId } = req.body

    if(!userId) {
        const err = new Error('User Id requried')
        err.statusCode = 400
        throw err
    }

    const attendance = await Attendance.findOne({
        where: { userId: userId, eventId: req.params.eventId }
    })

    if (group.organizerId !== user.id && userId !== userId) {
        const err = new Error('Forbidden')
        err.statusCode = 403
        throw err
    }

    if(attendance) {
        await attendance.destroy()
        res.json({message: "Successfully deleted attendance from event"})
    } else {
        const err = new Error("Attendance does not exist for this User")
        err.statusCode = 404
        throw err
    }

})

router.get('/:eventId', async (req, res) => {
    const events = await Event.findAll()
    const eventIds = dataGen.utils.getIds(events)

    if(!eventIds.includes(+req.params.eventId)) {
        const err = new Error('Event couldn\'t be found')
        err.statusCode = 404
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
    
    if(event.price && typeof event.price === "number") {
        event.price = parseInt(event.price).toFixed(2)
    }
    
    res.json(event)
})

const validateEvent = (async (req, res, next) => {
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body
    const err = new Error()
    err.errors = {}

    if(venueId) {
        const venue = await Venue.findByPk(venueId)
        if(!venue) {
            err.errors.venueId = "Venue does not exist"
        }
    }
    if(name && name.length < 5) {
        err.errors.name = "Name must be at least 5 characters" 
    }
    if(type && !["Online", "In person"].includes(type)) {
        err.errors.type = "Type must be Online or In person"
    }
    if(capacity && typeof capacity !== "number") {
        err.errors.capacity = "Capacity must be an integer"
    }

    const priceRegex = new RegExp(/\d+\.\d{1,2}/)
    if(price) {
        if(typeof price !== 'number' || !priceRegex.test(price.toFixed(2).toString())) {
            err.errors.price = "Price invalid"
        }
    }

    if(price === "") {
        err.errors.price = "Price invaild"
    }

    if(description && description == "") {
        err.errors.description = "Description is required"
    }
    
    if(Date.parse(startDate) < Date.now()) {
        err.errors.startDate = "Start date must be in the future"
    }

    if(Date.parse(startDate) > Date.parse(endDate)) {
        err.errors.endDate = "End date is less than start date"
    }

    if(Object.keys(err.errors).length) {
        err.message = "Validation Error"
        err.statusCode = 400
        throw err
    } else {
        next()
    }
 })

router.put('/:eventId', [restoreUser, requireAuth, validateEvent], async (req, res) => {
    const { user } = req

    let event = await Event.findByPk(req.params.eventId)
    const venue = await Venue.findByPk(event.venueId)
    
    if(!event || !venue) {
        const err = new Error('')
        err.message = !event ? 'Event couldn\'t be found' : 'Venue couldn\'t be found'
        err.statusCode = 404
        throw err
    }
    
    const group = await Group.findByPk(event.groupId)

    const membershipStatus = await Membership.findAll({
        where: { groupId: group.id, status: 'co-host', userId: user.id }
    })

    if(group.organizerId !== user.id && !membershipStatus) {
        const err = new Error('Forbidden')
        err.statusCode = 403
        throw err
    }

    event = await event.update(req.body)
    let { id, groupId, venueId, name, type, capacity, price, description, startDate, endDate} = event
    price = price.toFixed(2)
   res.json({
      id,
      groupId,
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate
    })
})

router.delete('/:eventId', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req
    
    const event = await Event.findByPk(req.params.eventId)
    if(!event) {
        const err = new Error('Event couldn\'t be found')
        err.statusCode = 404
        throw err
    }

    const group = await Group.findByPk(event.groupId)
    console.log(user.id)
    if(!group) {
        const err = new Error('Group couldn\'t be found')
        err.statusCode = 404
        throw err
    }

    const membershipStatus = await Membership.findAll({
        where: { groupId: group.id, status: 'co-host', userId: user.id }
    })

    if(group.organizerId !== user.id && !membershipStatus) {
        const err = new Error('Forbidden')
        err.statusCode = 403
        throw err
    }

    if(event) {
        await event.destroy()
        res.json({message: "Successfully deleted"})
    } else {
        const err = new Error('Event couldn\'t be found')
        err.statusCode = 404
        throw err
    }

    
})

router.get('/', async (req, res) => {

    const queryParams = {
        where: {}
    }
    
    if(req.query.name) {
        queryParams.where.name = req.query.name
    }

    if(req.query.type) {
        queryParams.where.type = req.query.type
    }

    if(req.query.startDate) {
        queryParams.where.type = req.query.startDate
    }

    let { page, size, name, type, startDate } = req.query
    // console.log(queryParams)

    if (Number.isNaN(page) || page <= 0 || !size) page = 1;
    if (Number.isNaN(size) || size <= 0 || !size) size = 4;

    const pagination = {
        limit: +size,
        offset: +size * (+page - 1)
    }


    let events = await Event.findAll({
        ...pagination,
        attributes: {exclude: ['createdAt', 'updatedAt', 'description', 'price', 'capacity']},
        include: [
            { model: Venue, attributes: ['id', 'city', 'state'] },
            { model: Group, attributes: ['id', 'name', 'city', 'state'] }
        ],
        // limit: parseInt(size),
        // offset: parseInt(size) * (parseInt(page)),
        ... queryParams,
        ...pagination

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
        events[i].previewImage = previewImage ? previewImage['url'] : null

        if(events[i].type === "Online") {
            events[i].Venue = null
        }
    }

    Events.Events = [...events]

    res.json(Events)
})


router.use((err, req, res, next) => {
    res.status(err.statusCode || 401).json({
        message: err.message,
        statusCode: err.statusCode,
        errors: err.errors
    })
})

module.exports = router