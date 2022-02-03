const { ReportProblemEvent } = require("../../../../db/index");
const { getEventsByCarIdAndEventType, postEvent } = require("./event");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");

module.exports = {
  postReportProblemEvent: async (event) => {
    const car = await getCarDetail(event.carId);
    let availableStatuses = ["IN_USE", "AVAILABLE"];
    let newCarStatus = "INFORMED";

    const isValidStatus = availableStatuses.some(status => status === car.status);
    if (isValidStatus) {
      const eventCreated = await postEvent(event, ReportProblemEvent);
      if (eventCreated) {
        await updateCarStatus(car.id, newCarStatus);
        return eventCreated;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },

  getReportProblemEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, ReportProblemEvent);
  }
}
