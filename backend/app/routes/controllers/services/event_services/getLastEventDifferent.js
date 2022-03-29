const { DriverEvent, Event, db } = require("../../../../db/index");
const { eventTypes } = require("../../../../utils/constants");
const { getEventDetail } = require("./event");

module.exports = {
  /**
   * Return the last event different of {excludedStatuses}
   * @param {Number} carId 
   * @param {Array} excludedStatuses 
   * @return {Event} the last event different of {excludedStatuses}
   * @return {Null} if not found any @Event
   */
  getLastEventDifferent: async (carId, excludedStatuses = []) => {
    let excludedStatusesNumbers = [];
    if (excludedStatuses.length > 0) {
      excludedStatusesNumbers = excludedStatuses.map(status => typeof status === "string" ? eventTypes[status] : e);
    }
    let query = {
      where: { carId, type: { [db.Sequelize.Op.notIn]: excludedStatusesNumbers } },
      order: [['createdAt', 'DESC']],
      attributes: ['id'],
      limit: 1,
    };
    const result = await Event.findOne(query);
    return getEventDetail(result.id);
  },
}