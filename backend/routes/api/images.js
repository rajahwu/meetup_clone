const express = require('express');
const router = express.Router();

const { EventImage, GroupImage, Group, Membership, Event } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

router.delete('/group-images/:imageId', [restoreUser, requireAuth], async (req, res) => {
    const { user } = req

    const image = await GroupImage.findByPk(req.params.imageId)

    if(!image) {
        const err = new Error('Group image couldn\'t be found')
        err.statusCode = 404
        throw err
    }

    const group = await Group.findOne({
        where: {id: image.groupId}
    })
    const membershipStatus = Membership.findAll({
        where: { groupId: group.id, status: 'co-host', userId: user.id }
    })

    if(group.organizerId !== user.id && membershipStatus.id !== user.id) {
        const err = new Error('Forbidden')
        err.statusCode = 403
        throw err
    }
    

    await image.destroy()
    res.json({message: "Successfully deleted"})
})

router.delete('/event-images/:imageId', [restoreUser, requireAuth], async(req, res) => {
    const { user } = req

    const image = await EventImage.findByPk(req.params.imageId)

    if(!image) {
        const err = new Error('Group image couldn\'t be found')
        err.statusCode = 404
        throw err
    }

    const event = await Event.findByPk(image.eventId)
    const group = await Group.findByPk(event.groupId)
    
    
    const membershipStatus = Membership.findAll({
        where: { groupId: group.id, status: 'co-host', userId: user.id }
    })

    if(group.organizerId !== user.id && membershipStatus.id !== user.id) {
        const err = new Error('Forbidden')
        err.statusCode = 403
        throw err
    }

     await image.destroy()    
     res.json({message: "Successfully deleted"})
})

router.use((err, req, res, next) => {
    res.status(err.statusCode || 401).json({
        message: err.message,
        statusCode: err.statusCode,
        errors: err.errors
    })
})


module.exports = router