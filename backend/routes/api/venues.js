const express = require('express');
const router = express.Router()

const { Venue, Membership } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

const validateVenue = ((req, res, next) => {
    const err = new Error('');
    err.errors = {}

    if(address && address == "") {
        err.errors.address = "Street address is required"
    }

    if(city && city == "") {
        err.errors.city = "City is required"
    }

    if(state && state == "") {
        err.errors.state = "State is required"
    }

    if(lat && lat == "") {
        err.errors.lat = "Latitude is not valid"
    }

    if(lng && lat == "") {
        err.errors.lng ="Latitude is not valid"
    }

    if(Object,key(err.errors).length) {
        err.message = "Validaton Error"
        err.statusCode = 400
        throw err
    } else {
        next()
    }
})

router.put('/:venueId', [restoreUser, requireAuth, validateVenue], async (req, res) => {
    let venue = await Venue.findbyByPk(req.params.venueId)

    if(!venue) {
        const err = new Error('')
        err.message = "Venue couldn\'t be found"
        err.statusCode = 404
        throw err
    }

    const { user } = req

    const group = findOne({
        where: {groupId: venue.groupId}
    })
    const membershipStatus = Membership.findAll({
        where: { groupId: group.id, status: 'co-host' }
    })

    if(group.orginizer.id !== user.id && !membershipStatus) {
        const err = new Error()
        err.statusCode = 400
    }

    venue.update(req.body)

    res.json(venue)


})

router.use((err, req, res, next) => {
    res.json({
        message: err.message,
        statusCode: err.statusCode,
        errors: err.errors
    })
})
module.exports = router