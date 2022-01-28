const { WorkshopEvent } = require("../../../../db/index");
const { postEvent, getEventsByCarIdAndEventType } = require("./event");

module.exports = {
  postWorkshopEvent: async (event) => {
    return postEvent(event, WorkshopEvent);
  },

  getWorkshopEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, WorkshopEvent);
  }
}
  