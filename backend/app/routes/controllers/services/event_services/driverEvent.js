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
      availableStatuses = ["OUT_OF_SERVICE"];
      newCarStatus = "RESERVED";
    } else { // wants to assign one driver
      availableStatuses = ["OUT_OF_SERVICE", "RESERVED", "AVAILABLE", "REPAIR"];
      newCarStatus = "IN_USE";
    }
  } else {// wants to unassign one driver
    availableStatuses = ["INFORMED", "REPAIR", "IN_USE", "RESERVED", "DISCHARGED", "EXPIRED_DOCUMENTATION"];
    newCarStatus = car.status;
    if (car.status === "IN_USE" || car.status === "RESERVED") {
      newCarStatus = "AVAILABLE";
    }
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

  unAssignDriverByCarId: async (event, carId) => {
    event.carId = carId;
    event.driver = null;
    return postDriverEvent(event);
  }
}
