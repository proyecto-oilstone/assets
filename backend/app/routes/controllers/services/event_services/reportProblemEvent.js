const { ReportProblemEvent } = require("../../../../db/index");
const { getEventsByCarIdAndEventType, postEvent } = require("./event");

module.exports = {
  postReportProblemEvent: async (event) => {
    return postEvent(event, ReportProblemEvent);
  },

  getReportProblemEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, ReportProblemEvent);
  }
}
