const express = require('express');
const router = express.Router()

const { Venue, Membership, Group } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

const validateVenue = ((req, res, next) => {
    const err = new Error('');
    err.errors = {}

    const venue = Venue.findByPk(req.params.venueId)

    const { address, city, state, lat, lng } = req.body
    if(!venue.address && address == "") {
        err.errors.address = "Street address is required"
    }

    if(!venue.city && city == "") {
        err.errors.city = "City is required"
    }

    if(!venue.state && state == "") {
        err.errors.state = "State is required"
    }

    if((!venue.lat && lat == "") || (+lat > 90 || +lat < -90)) {
        err.errors.lat = "Latitude is not valid"
    }

    if(!venue.lng && (lat == "" )|| (+lng > 180 || +lng < -180)) {
        err.errors.lng ="Latitude is not valid"
    }

    if(Object.keys(err.errors).length) {
        err.message = "Validaton Error"
        err.statusCode = 400
        throw err
    } else {
        next()
    }
})

router.put('/:venueId', [restoreUser, requireAuth, validateVenue], async (req, res) => {
    let venue = await Venue.findByPk(req.params.venueId)

    if(!venue) {
        const err = new Error('')
        err.message = "Venue couldn\'t be found"
        err.statusCode = 404
        throw err
    }

    const { user } = req

    const group = await Group.findByPk(venue.groupId)

    const membershipStatus = await Membership.findOne({
        where: { groupId: group.id, status: 'co-host', userId: user.id }
    })

    if(group.organizerId !== user.id && !membershipStatus) {
        const err = new Error('Forbidden')
        err.statusCode = 403
        throw err
    }

    venue = await venue.update(req.body)

    const { id, groupId, address, city, state, lat, lng } = venue
    res.json({
        id,
        groupId,
        address,
        city,
        state,
        lat,
        lng
    })


})

router.use((err, req, res, next) => {
    res.status(err.statusCode || 401 ).json({
        message: err.message,
        statusCode: err.statusCode,
        errors: err.errors
    })
})
module.exports = router