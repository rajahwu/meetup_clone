const {faker} = require('@faker-js/faker');

module.exports = class VenueData {
    constructor(foreignKeys = {}) {
        this.groupId = foreignKeys.groupId
        this.address = faker.address.streetAddress()
        this.city = faker.address.city()
        this.state = faker.address.state()
        this.lat = faker.address.latitude()
        this.lng = faker.address.longitude()
    }
}
