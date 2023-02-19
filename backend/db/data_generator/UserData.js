const {faker} = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

module.exports = class UserData {
    constructor() {
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.email = faker.internet.email();
        this.hashedPassword =  bcrypt.hashSync(faker.internet.password())
    }
}