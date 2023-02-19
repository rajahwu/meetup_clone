const {faker} = require('@faker-js/faker');
const MembershipData = require('./MembershipData')
const AttendanceData = require('./AttendanceData')

const utils = {
    getRandom(num) {
        return Math.floor(Math.random() * num)
        },

    getBool() {
        const bools = [false, true]
        return bools[this.getRandom(2)]
        },

    getType() {
        const index = this.getRandom(2)
        const types = ["In Person", "Online"]
        return types[index]
        },

    getStatus(type) {
        if (type instanceof MembershipData) {
            const statusTypes = ["co-host", "member", "pending"]
            return statusTypes[this.getRandom(statusTypes.length)]
        } 
        
        if (type instanceof AttendanceData) {
            const statusTypes = ["member", "waitlist", "pending"]
            return statusTypes[this.getRandom(statusTypes.length)]
        }

        else throw new Error(`${type} requires vaild status type`)
        
    },

    getEventDates() {
        const start = this.getRandom(180) + 1
        const end = start + this.getRandom(7) + 1
        const startDate = faker.date.soon(start)
        const endDate = faker.date.soon(end, startDate)
        if(
            startDate.getTime() > endDate.getTime() 
        ) {
            this.getEventDates()
        } else
        return [startDate, endDate]
    }
}

module.exports = utils
