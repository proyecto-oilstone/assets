const { statusCarToString } = require("../../../../utils/functions");
const { getLastDriverEventByCarId } = require("../event_services/getLastDriverEventByCarId");

/**
 * Get the current driver of one car, can be reserved driver too
 * 
 * @param {Car} car
 * @returns {String} with the name of driver
 * @returns {String} empty if car status is not in_use or reserved or not have any driver assigned
 */
const getCurrentCarDriver = async (car) => {
  const status = typeof car.status === "string" ? car.status : statusCarToString(car.status);
  if (status === "IN_USE" || status === "RESERVED") {
    const lastDriverEvent = await getLastDriverEventByCarId(car.id);
    return lastDriverEvent.driver;
  } else {
    return "";
  }
};

module.exports = getCurrentCarDriver;