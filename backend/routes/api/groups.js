const express = require('express')
const router = express.Router()
const dataGen = require('../../db/data_generator')
const { Group, GroupImage, User, Membership } = require('../../db/models')

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