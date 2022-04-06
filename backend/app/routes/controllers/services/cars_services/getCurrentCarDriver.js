const { statusCarToString } = require("../../../../utils/functions");
const { getLastDriverEventByCarId } = require("../event_services/getLastDriverEventByCarId");

/**
 * Get the current driver of one car, can be reserved driver too
 * 
 * @param {Car} car
 * @returns {String} with the name of driver
 * @returns {String} empty if car status is not in_use, reserved, informed, repair or not have any driver assigned
 */
const getCurrentCarDriver = async (car) => {
  const status = typeof car.status === "string" ? car.status : statusCarToString(car.status);
  const statuses = ["IN_USE", "RESERVED", "INFORMED", "REPAIR"];
  if (statuses.includes(status)) {
    const lastDriverEvent = await getLastDriverEventByCarId(car.id);
    return lastDriverEvent !== null ? lastDriverEvent.driver : "";
  } else {
    return "";
  }
};

module.exports = getCurrentCarDriver;