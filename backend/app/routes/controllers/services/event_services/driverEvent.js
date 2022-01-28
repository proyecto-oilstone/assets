const { DriverEvent } = require("../../../../db/index");
const { postEvent, getEventsByCarIdAndEventType } = require("./event");

module.exports = {
  postDriverEvent: async (event) => {
    return postEvent(event, DriverEvent);
  },

  getDriverEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, DriverEvent);
  },
}
