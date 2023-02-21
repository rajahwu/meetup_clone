const {faker} = require('@faker-js/faker');

module.exports = class GroupImageData {
    constructor(utils, foreignKeys = {}) {
        this.groupId = foreignKeys.groupId
        this.url = faker.internet.url()
        this.preview = utils.getBool()
    }
}