'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataGen = require('../data_generator')
const { Group } = require('../models')

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
    const images = await genGroupImages()
      await queryInterface.bulkInsert('GroupImages', images , {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('GroupImages', null, {});
  }
};
