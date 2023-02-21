'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { Event } = require('../models')
let options = {}
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

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
    options.tableName = 'EventImages'
    const eventImages = await genEventImages()
      await queryInterface.bulkInsert(options, eventImages, {});
  },

  async down (queryInterface, Sequelize) {
      options.tableName = 'EventImages'
      await queryInterface.bulkDelete(options, null, {});
  }
};
