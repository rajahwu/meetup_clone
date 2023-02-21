const {faker} = require('@faker-js/faker');

module.exports = class GroupData {
    constructor(utils, foreignKeys = {}) {
        this.organizerId = foreignKeys.organizerId
        this.name = faker.company.name(); 
        this.about = faker.lorem.sentence(25);
        this.type = utils.getType();
        this.private = utils.getBool();
        this.city = faker.address.city();
        this.state = faker.address.state();
    }
}
