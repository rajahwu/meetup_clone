
const dataGen = require('../data_generator')
const { User } = require('../models')


async function testModel() {
    const users = await User.findAll()
    console.log(users)
}

testModel()

// console.log( User)
