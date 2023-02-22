const express = require('express')
const router = express.Router()
const dataGen = require('../../db/data_generator')
const { Group, GroupImage, User, Membership, Venue, Event, Attendance } = require('../../db/models')

router.get('/:groupId/events', async (req, res) => {
    const groups = await Group.findAll()
    const groupIds = dataGen.utils.getIds(groups)

    if(!groupIds.includes(+req.params.groupId)) {
        const err = new Error('Group does not exist')
        err.status = 404
        throw err
    }
    const Events = { Events: [] }

    let events = await Event.findAll({
        attributes: {exclude: ['description', 'capacity', 'price', 'createdAt', 'updatedAt']},
        include: [{ model: Venue, attributes: ['id', 'city', 'state'] }, {model: Group, attributes: ['id', 'name', 'city', 'state']}],
        where: {groupId: req.params.groupId}
    })

    events = JSON.parse(JSON.stringify(events))

    for(let event of events) {
        const numAttending = await Attendance.count({
            where: { eventId: event.id }
        })

        const previewImage = await GroupImage.findOne({
            where: {groupId: event.id}
        })

        event.numAttending = numAttending
        event.previewImage = previewImage

        Events.Events.push(event)
    }

    res.json(Events)
})

router.get('/:groupId', async (req, res) => {
    const groups = await Group.findAll()
    const groupIds = dataGen.utils.getIds(groups)

    if(!groupIds.includes(+req.params.groupId)) {
        const err = new Error('Group does not exist')
        err.status = 404
        throw err
    }

    let group = await Group.findByPk(req.params.groupId, {
        include: [
            {model: GroupImage, attributes: ['id', 'url', 'preview']},
            {model: Venue, attributes: { exclude: ['createdAt', 'updatedAt']} }
        ]
    })

    const users = await Membership.count({
        where: {
            groupId: req.params.groupId
        }
    })

    group = JSON.parse(JSON.stringify(group))

    let organizer = await User.findByPk(group.organizerId, {
        attributes: ['id', 'firstName', 'lastName']
    })

    organizer = JSON.parse(JSON.stringify(organizer))
    
    group.numMembers = users
    group.Organizer = organizer
    
    res.json(group)
})

router.get('/', async (req, res) => {
    let groups = await Group.findAll()
    const groupIds = dataGen.utils.getIds(groups)
    
    
    groups = JSON.parse(JSON.stringify(groups))

    for (let i = 0; i < groupIds.length; i++) {
        const users = await Membership.count({
            where: {groupId: groupIds[i]}
        })

        let previewImage = await GroupImage.findOne({
            where: { groupId: groupIds[i] },
            attriubtes: ['url']
        })
        
        previewImage = JSON.parse(JSON.stringify(previewImage))
        groups[i].numMembers = users 
        groups[i].previewImage = previewImage['url']
    }
    
    res.json(groups)
})

module.exports = router