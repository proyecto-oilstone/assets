const { RepairRequestEvent } = require("../../../../db/index");
const { getEventsByCarIdAndEventType, postEvent } = require("./event");

module.exports = {
  postRepairRequestEvent: async (event) => {
    return postEvent(event, RepairRequestEvent);
  },

  getRepairRequestEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, RepairRequestEvent);
  },
}
