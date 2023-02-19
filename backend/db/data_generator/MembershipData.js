module.exports = class MembershipData {
    constructor(utils, foreignKeys = {}) {
        this.userId = foreignKeys.userId
        this.groupId = foreignKeys.groupId
        this.status = utils.getStatus(this)
    }
}
