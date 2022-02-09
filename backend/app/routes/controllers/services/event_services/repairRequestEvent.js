const { RepairRequestEvent } = require("../../../../db/index");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");
const { getEventsByCarIdAndEventType, postEvent } = require("./event");

module.exports = {
  postRepairRequestEvent: async (event) => {
    const car = await getCarDetail(event.carId);
    let newCarStatus = null;
    if (event.problemId !== null && event.providerId !== null) {// wants to create repair request
      if (car.status === "INFORMED") {
        newCarStatus = "REPAIR";
      }
    } else {// wants to finish the repair request
      if (car.status === "REPAIR") {
        newCarStatus = "AVAILABLE";
      }
    }

    if (newCarStatus) {
      const eventCreated = await postEvent(event, RepairRequestEvent);
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

  getRepairRequestEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, RepairRequestEvent);
  },
}
