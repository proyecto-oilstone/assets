const { WorkshopEvent } = require("../../../../db/index");
const { postEvent, getEventsByCarIdAndEventType } = require("./event");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");

module.exports = {
  postWorkshopEvent: async (event) => {
    const car = await getCarDetail(event.carId);
    const hasMandatoryDocumentation = car.VTV !== null && car.seguro !== null;
    if (!hasMandatoryDocumentation) throw new Error("Invalid documentations of car");
    let availableStatuses = ["IN_USE", "DISCHARGED", "RESERVED", "OUT_OF_SERVICE", "REPAIR"];
    const isValidStatus = availableStatuses.some(status => status === car.status);
    if (isValidStatus) {
      const eventCreated = await postEvent(event, WorkshopEvent);
      if (eventCreated) {
        await updateCarStatus(car.id, "AVAILABLE");
        return eventCreated;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },

  getWorkshopEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, WorkshopEvent);
  }
}
  