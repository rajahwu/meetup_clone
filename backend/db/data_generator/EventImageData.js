const {faker} = require('@faker-js/faker');

module.exports = class EventImageData {
    constructor(utils, foreignKeys = {}) {
        this.eventId = foreignKeys.eventId
        this.url = faker.internet.url()
        this.preview = utils.getBool()
    }
}