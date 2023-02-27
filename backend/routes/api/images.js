const express = require('express');
const router = express.Router();

const { EventImage, GroupImage, Group, Membership } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

router.delete('/group-images/:imageId', [restoreUser, requireAuth], async (req, res) => {
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
    const image = await EventImage.findByPk(req.params.imageId)

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


module.exports = router