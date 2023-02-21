const {faker} = require('@faker-js/faker');
const { utils } = require('.');

module.exports = class EventData {
    constructor(utils, foreignKeys = {}) {
        this.venueId = foreignKeys.venueId
        this.groupId = foreignKeys.groupId
        
        this.name = `${faker.company.name()}'s ${faker.company.bsAdjective()} ${faker.company.catchPhrase()}`
        this.description = faker.lorem.sentence(5)
        this.type = utils.getType()
        this.capacity = utils.getRandom(50) + 10
        this.price = parseInt(faker.commerce.price())
        
        const eventDates = utils.getEventDates()
        this.startDate = eventDates ? eventDates[0] : Date.now()
        this.endDate = eventDates ? eventDates[1] : faker.date.soon(1, this.startDate)
    }
    
}

