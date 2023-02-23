const express = require('express')
const router = express.Router()
const dataGen = require('../../db/data_generator')
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, User, Membership, Venue, Event, Attendance } = require('../../db/models')

router.get('/current', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req
    const groups = await Group.findAll({
        where: { organizerId: user.id},
        // include: {model: Membership, where: {userId: user.id}}
    })
    res.json(groups)
})

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
            attributes: ['url'],
            where: {groupId: req.params.groupId}
        })

        event.numAttending = numAttending
        event.previewImage = previewImage['url']

        Events.Events.push(event)
    }

    res.json(Events)
})

router.get('/:groupId/venues', async (req, res) => {
    const Venues = { Venues: [] }
    const venues = await Venue.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        where: { groupId: req.params.groupId,  }
    })
    Venues.Venues = [...venues]
    res.json(Venues)
})

router.post('/:groupId/images', [restoreUser, requireAuth], async (req, res) => {
    const group = await Group.findByPk(req.params.groupId)
    if(!group) return res.json({
       "message" :"Group couldn't be found",
        "statusCode": 404
    })
    const { user } = req
    if(group.organizerId !== user.id) {
        return res.json({"message": "Group must be owned by user"})
    }
    const { url, preview } = req.body
    
    const newImage = {
        url, preview,
        groupId: req.params.groupId
   }

    const image = await GroupImage.create(newImage)

    res.json(image)
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

router.delete('/:groupId', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req
    const group = await Group.findByPk(req.params.groupId)

    if(!group) return res.status(404).json({
        "message": "Groups couldn't be found",
        "statuscode": 404
    })
    if(group.organizerId === user.id) {
        await Group.destroy({
            where: {id: req.params.groupId}
        })
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        err = new Error('Group must belong to the user')
    }
})


router.get('/', async (req, res) => {
    const Groups = { Groups: [] }

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
        if(groups[i].previewImage) {
            groups[i].previewImage = previewImage['url']
        } else {
            groups[i].previewImage = null
        }
    }

    Groups.Groups = [...groups]

    res.json(Groups)
})

const validateGroup = ((req, res, next) => {
    const err = new Error('')
    err.errors = {}
    if(req.body.name.length > 60) {
        err.errors.name = "Name must be 60 characters or less"
    }

    if(req.body.about.length < 50) {
       err.errors.about = "About must be 50 characters or more"
    }

    if(req.body.type !== "Online" && req.body.type !== "In person") {
        err.errors.type = "Type must be 'Online or 'In person"
    }

    if(typeof req.body.private !== "boolean") {
        console.log(req.body.private, typeof req.body.private)
        err.errors.type = "Private must be a boolean"
    }

    if(!req.body.city) {
        err.errors.city = "City is required"
    }

    if(!req.body.state) {
        err.errors.state = "State is required"
    }

    if(Object.keys(err.errors).length) {
        err.message = "Validation Error"
        err.statusCode = 400

        // delete error.title
        delete err.stack
        throw err
    } else {
        next()
    }
})

router.post('/', [restoreUser, requireAuth, validateGroup], async (req, res) => {
    const { user } = req
    const { name, about, type, private, city, state } = req.body


    const newGroup = {
        name, about, type, private, city, state,
        organizerId: user.id 
   }

    const group = await Group.create(newGroup)

    res.json(group)
})



module.exports = router