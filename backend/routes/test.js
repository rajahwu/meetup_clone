const express = require('express');
const { ForeignKeyConstraintError } = require('sequelize');
const { utils, group } = require('../db/data_generator');
const router = express.Router();

const dataGen = require('../db/data_generator');
const EventImageData = require('../db/data_generator/EventImageData');
const { User, Group, Membership, GroupImage, Venue, Event, EventImage, Attendance } = require('../db/models')



router.get('/users', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})
router.get('/groups', async (req, res) => {
  const groups = await Group.findAll()
  res.json(groups)
})
router.get('/memberships', async (req, res) => {
  const memberships = await Membership.findAll()
  res.json(memberships)
})
router.get('/groupImages', async (req, res) => {
  const groupImages = await GroupImage.findAll()
  res.json(groupImages)
})
router.get('/venues', async (req, res) => {
  const venues = await Venue.findAll()
  res.json(venues)
})
router.get('/events', async (req, res) => {
  const events = await Event.findAll()
  res.json(events)
})
router.get('/eventImages', async (req, res) => {
  const eventImages = await EventImage.findAll()
  res.json(eventImages)
})
router.get('/attendees', async (req, res) => {
  const attendees = await Attendance.findAll()
  res.json(attendees)
})

module.exports = router