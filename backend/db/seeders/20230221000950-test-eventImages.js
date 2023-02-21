'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { Event } = require('../models')

async function genEventImages() {
  const eventImages = []
  const events = await Event.findAll()
  const ids = dataGen.utils.getIds(events)
  ids.forEach(id => {
    const event = eventImages.push(new dataGen.eventImage(dataGen.utils, {eventId: id}))
    eventImages.push(event)
  })
  return eventImages
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const eventImages = await genEventImages()
      await queryInterface.bulkInsert('EventImages', eventImages, {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('EventImages', null, {});
  }
};
