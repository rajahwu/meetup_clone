
const dataGen = require('../data_generator')
const { User } = require('../models')


async function testModel() {
    const users = await User.findAll()
}

testModel()

