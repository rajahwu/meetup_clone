const express = require('express');
const { utils } = require('../db/data_generator');
const router = express.Router();

const dataGen = require('../db/data_generator')
const { User, Group, GroupImage } = require('../db/models')



router.get('/', async (req, res) => {
    const images = await Group.findAll({
        include: [{model: GroupImage}]
    })
    res.json(images)
})

module.exports = router