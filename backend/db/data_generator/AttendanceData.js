module.exports = class AttendanceData {
    constructor(utils, foreignKeys = {}) {
        this.eventId = foreignKeys.eventId
        this.userId = foreignKeys.userId
        this.status = utils.getStatus(this)
    }
}
