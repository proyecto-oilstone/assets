const { DriverEvent } = require("../../../../db/index");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");
const { postEvent, getEventsByCarIdAndEventType } = require("./event");

const postDriverEvent = async (event) => {
  const car = await getCarDetail(event.carId);
  let availableStatuses;
  let newCarStatus;
  if (event.driver !== null) {// wants to assign driver
    if (event.isReserved) {// wants to reserve one driver
      availableStatuses = ["AVAILABLE", "IN_USE"];
      newCarStatus = "RESERVED";
    } else { // wants to assign one driver
      availableStatuses = ["RESERVED", "AVAILABLE", "REPAIR", "IN_USE"];
      newCarStatus = "IN_USE";
    }
  } else {
    throw new Error("Invalid driver");
  }

  const isValidStatus = availableStatuses.some(status => status === car.status);
  if (isValidStatus) {
    const eventCreated = await postEvent(event, DriverEvent);
    if (eventCreated) {
      await updateCarStatus(car.id, newCarStatus);
      return eventCreated;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = {
  postDriverEvent,

  getDriverEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, DriverEvent);
  },

}
