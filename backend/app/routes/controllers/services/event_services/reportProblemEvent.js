const { ReportProblemEvent } = require("../../../../db/index");
const { getEventsByCarIdAndEventType, postEvent } = require("./event");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");

module.exports = {
  postReportProblemEvent: async ({ prm, data, problem, description, carId }) => {
    const event = {
      carId,
      problem,
      description,
      resolved: false,
      data: data !== null ? data.buffer : null,
      data_name: data !== null ? data.originalname : null,
      data_type: data !== null ? data.mimetype : null,
      prm: prm !== null ? prm.buffer : null,
      prm_name: prm !== null ? prm.originalname : null,
      prm_type: prm !== null ? prm.mimetype : null,
    }
    const car = await getCarDetail(event.carId);

    let availableStatuses = ["IN_USE", "AVAILABLE", "INFORMED"];
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
