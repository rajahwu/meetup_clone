const express = require('express');
const { utils } = require('../db/data_generator');
const router = express.Router();

const dataGen = require('../db/data_generator')
const { User, Group } = require('../db/models')

async function genMembership(num) {
    const memberships = []
    const users = await User.findAll()
    const groups = await Group.findAll()
    const userIds = dataGen.utils.getIds(users)
    const groupIds = dataGen.utils.getIds(groups)
    for( let i = 0; i < num; i++ ) {
        const membership = new dataGen.membership(dataGen.utils, {
            userId: userIds[dataGen.utils.getRandom(userIds.length - 1)],
            groupId: groupIds[dataGen.utils.getRandom(groupIds.length - 1)]
        })
        memberships.push(membership)
    }
    return memberships
}




router.get('/', async (req, res) => {
    const memberships = await genMembership(5)
    res.json(memberships)
})

module.exports = router