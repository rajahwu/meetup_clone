'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { Group } = require('../models')
let options = {}
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

async function genGroupImages() {
  const images = []
  const groups = await Group.findAll()
  const ids = dataGen.utils.getIds(groups)
  ids.forEach(id => {
      const image = new dataGen.groupImage(dataGen.utils, { groupId: id })
      images.push(image)
  })
  return images
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'GroupImages'
    const images = await genGroupImages()
      await queryInterface.bulkInsert(options, images , {});
  },

  async down (queryInterface, Sequelize) {
      options.tableName = 'GroupImages'
      await queryInterface.bulkDelete(options, null, {});
  }
};
