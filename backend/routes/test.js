const express = require('express');
const { utils } = require('../db/data_generator');
const router = express.Router();

const dataGen = require('../db/data_generator')
const { User } = require('../db/models')

function getIds(data) {
  data = JSON.parse(JSON.stringify(data))
  const ids = data.map(data => data.id)
   return ids
  }

async function groups(num) {
    const groups = []
    const users = await User.findAll()
    const userIds = dataGen.utils.getIds(users)
    for(let i = 0; i < num; i++) {
        const group = new dataGen.group(dataGen.utils, { organizerId: userIds[dataGen.utils.getRandom(userIds.length - 1)]})
        groups.push(group)
    }
    return groups
}

router.get('/', async (req, res) => {
    const group = await groups(5)
    res.json(group)
})

module.exports = router