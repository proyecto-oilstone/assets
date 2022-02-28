const { DriverEvent, Event } = require("../../../../db/index");
const { eventTypes } = require("../../../../utils/constants");
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
  } else {// wants to unassign one driver
    availableStatuses = ["INFORMED", "REPAIR", "RESERVED", "AVAILABLE", "DISCHARGED", "EXPIRED_DOCUMENTATION", "IN_USE"];
    newCarStatus = car.status;
    if (car.status === "IN_USE" || car.status === "RESERVED" || "AVAILABLE") {
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
  },

  /**
   * Return the last event assigned to one car of type DRIVER, can be assigned driver or assigned reserved driver
   * @param {Number} carId 
   * @return {DriverEvent} the last driver event of one car
   * @return {Null} if not found any driver event
   */
  getLastDriverEventByCarId: async (carId) => {
    let query = {
      where: { carId, type: eventTypes['DRIVER'] },
      order: [['createdAt', 'DESC']],
      limit: 1,
      include: DriverEvent,
    };
    let result = await Event.findOne(query);
    if (result) {
      result = { ...result.dataValues, ...result.DriverEvent.dataValues };
      delete result.DriverEvent;
      return result;
    } else {
      return null;
    }
  },
}
