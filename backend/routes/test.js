const express = require('express');
const { utils } = require('../db/data_generator');
const router = express.Router();

const dataGen = require('../db/data_generator')
const { User, Group, GroupImage, Venue } = require('../db/models')


function genEvents() {
  
}

router.get('/', async (req, res) => {
  const venues = await Venue.findAll()

    res.json(venues)
})

module.exports = router