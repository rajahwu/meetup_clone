const express = require('express')
const router = express.Router()
const dataGen = require('../../db/data_generator')
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Group, GroupImage, User, Membership, Venue, Event, Attendance } = require('../../db/models');

router.get('/:groupId/venues', async (req, res) => {
    const venues = await Venue.findAll({
        where: {groupId: req.params.groupId}
    })
    res.json(venues)
})

router.post('/:groupId/venues', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req
    const group = await Group.findByPk(req.params.groupId)

    if(!group) {
        const err = new Error('Group Couldn\'t be found')
        err.statusCode = 404
        throw err
    }
    const groupStatus = await Membership.findAll({
        where: { 
            groupId: req.params.getId || null,
             userId: user.id }
    })
    if (group.organizerId !== user.id && groupStatus.status !== "co-host") {
      throw new Error('You cant do this')
    }

    const { address, city, state, lat, lng } = req.body
    console.log(lng)
    const err = new Error('Validation Error')
    err.errors = {}

    if(!address) {
        err.errors.address = "Street address is requried"
    }

    if(!city) {
        err.errors.city = "City is required"
    }

    if(!state) {
        err.errors.state = "State is required"
    }

    if(!lat) {
        err.errors.lat = "lat is not valid - fix check"
    }

    if(!lng) {
        err.errors.lng = "lng is not valid - fix check"
    }


    if(Object.keys(err.errors).length) {
        err.message = "Validation Error"
        err.statusCode = 400
        throw err
    }

    let venue = await Venue.create({
        address,
        city,
        state,
        lat,
        lng,
        groupId: req.params.groupId
    })

    venue = JSON.parse(JSON.stringify(venue))
    delete venue.createdAt
    delete venue.updatedAt

    res.json(venue)
})

router.post('/:groupId/events', [restoreUser, requireAuth], async (req, res) => {
        const { user } = req
        const group = await Group.findByPk(req.params.groupId)
        const groupStatus = await Membership.findAll({
            where: { 
                groupId: req.params.getId || null,
                 userId: user.id }
        })
        if (group.organizerId !== user.id && groupStatus.status !== "co-host") {
          throw new Error('You cant do this')
        }

        const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body
        const err = new Error('Validation error')
        err.errors = {}

        const venue = await Venue.findByPk(venueId)
        if(!venue) {
            err.errors.venue = "Venue does not exist"
        }

        if(name.length < 5) {
            err.errors.name = "Name must be at least 5 characters"
        }

        if(["Online", "In person"].includes(type)) {
            err.errors.type = "Type must be Online or In person"
        }

        if(typeof capacity !== 'number') {
            err.errors.capacity = "Capacity must be an integer"
        }

        if(!price) {
            err.errors.price = "Price invalid -- fix check"
        }

        if(!description) {
            err.errors.description = "Description is requried"
        }

        if(startDate < Date.now()) {
            err.errors.startDate = "Start date must be in the future"
        }

        if(startDate > endDate) {
            err.errors.endDate = "End date is less than start date"
        }

        if(Object.keys(err.errors).length) {
            err.message = "Validation Error"
            err.statusCode = 400
            throw err
        }

        const {groupId} = req.params
        console.log(groupId)
        const event = await Event.create({
            venueId,
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate,
            groupId
        })

        res.json(event)
})

router.get('/:groupId/members', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req
    const group = await Group.findByPk(req.params.groupId)

    const membershipStatus = await Membership.findOne({
        where: { groupId: req.params.groupId, userId: user.id }
    })

    if(group.organizerId !== user.id) {
        throw new Error('you cant do that')
    }
    

    const memberships = await Membership.findAll({
        where: { groupId: req.params.groupId }
    })
    res.json(memberships)
})

router.post('/:groupId/membership', [restoreUser, requireAuth], async (req, res) => {
    const group = await Group.findByPk(req.params.groupId)
    if(!group) {
        const err = Error('Group couldn\'t be found')
        err.statusCode = 404
        throw err
    }
    const { user } = req

    let membershipStatus = await Membership.findOne({
        where: { userId: user.id, groupId: req.params.groupId }
    })

    membershipStatus = JSON.parse(JSON.stringify(membershipStatus))


    if(membershipStatus) {
        const err = new Error('')
        err.statusCode = 400
        err.message = membershipStatus.status === "member" || membershipStatus.status === "co-host" ?
        "User is already a member"
        : "Membership has already been requested"
        throw err
    }
    
    const newMembership = await Membership.create({
        userId: user.id,
        groupId: req.params.groupId,
        status: "pending"
    })

    res.json({
        memberId: newMembership.id,
        status: newMembership.status
    })
} )

router.put('/:groupId/membership', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req
    const group = await Group.findByPk(req.params.groupId)
    const membershipStatus = Membership.findOne({
        where: {groupId: req.params.groupId, status: "co-host"}
    })
    let isOrganizer = false;
    let isCoHost = false;

    const { memberId, status } = req.body

    const membership = Membership.findOne({
        where: { groupId: req.params.groupId, id:  memberId }
    })

    membership.update(status)

    if(group.organizerId === user.id) {
        isOrganizer = true
    }
    if(membershipStatus) {
        isCoHost = true
    }

    res.json(membership)

})

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
    if(!group) {
        const err = new Error()
        err.message = "Group couldn't be found"
        err.statusCode = 404
        throw err
    }
    const { user } = req
    if(group.organizerId !== user.id) {
        const err = new Error('')
        err.message = "Group must be owned by user"
        throw err
    }

    const { url, preview } = req.body
    
    const newImage = {
        url, preview,
        groupId: req.params.groupId
   }

    let image = await GroupImage.create(newImage)
    image = JSON.parse(JSON.stringify(image))
    res.json({ 
            id: image.id,
            url: image.url,
            preview: image.preview 
        })
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

    if(!group){
        const err = new Error('')
        err.message = "Groups couldn't be found",
        err.statuscode = 404
        throw err
    }
    
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


const validateGroup = ((req, res, next) => {
    const { name, about, type, private, city, state } = req.body
    const err = new Error('')
    err.errors = {}

    if(name && name.length > 60) {
        err.errors.name = "Name must be 60 characters or less"
    }

    if(about && about.length < 50) {
       err.errors.about = "About must be 50 characters or more"

    }

    if(!["Online", "In person"].includes(type)) {
        err.errors.type = "Type must be 'Online or 'In person"

    }

    if(private && typeof req.body.private !== "boolean") {
        console.log(req.body.private, typeof req.body.private)
        err.errors.private = "Private must be a boolean"
    }

    if(!city) {
        err.errors.city = "City is required"
    }s

    if(!state) {
        err.errors.state = "State is required"
    }

    if(Object.keys(err.errors).length) {
        err.message = "Validation Error"
        err.statusCode = 400
        throw err
    } else {
        next()
    }
})


const parseGroup = ( async (req, res, next) => {
    let group = await Group.findByPk(req.params.groupId)
    if(!group){
        const err = new Error('')
        err.message = "Groups couldn't be found",
        err.statuscode = 404
        throw err
    }
    group = JSON.parse(JSON.stringify(group))
    req.body = Object.assign(group, req.body)
    console.log(req.body)
    next()
})

router.put('/:groupId', [restoreUser, requireAuth, parseGroup, validateGroup ], async (req, res) => {
   
    const group = await Group.findByPk(req.params.groupId)
    await group.update(req.body)
    res.json(group)
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

router.use((err, req, res, next) => {
    res.json({
        message: err.message,
        statusCode: err.statusCode,
        errors: err.errors
    })
})


module.exports = router