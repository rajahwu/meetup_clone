const express = require('express');
const router = express.Router();

const { Event } = require('../../db/models')

router.get('/', async (req, res) => {
    const events = await Event.findAll()

    res.json(events)
})

router.get('/:eventId', async (req, res) => {
    const event = Event.findByPk(req.params.eventId)

    res.json(event)
})




module.exports = router