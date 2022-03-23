const { statusCarToString } = require("../../../../utils/functions");
const { getLastDriverEventByCarId } = require("../event_services/driverEvent");

/**
 * Get the current driver of one car
 * 
 * @param {Car} car
 * @returns {String} with the name of driver
 * @returns {String} empty if car status is not in_use or not have any driver assigned
 */
const getCurrentCarDriver = async (car) => {
  const status = statusCarToString(car.status);
  if (status === "IN_USE") {
    const lastDriverEvent = await getLastDriverEventByCarId(car.id);
    return lastDriverEvent.driver;
  } else {
    return "";
  }
};

module.exports = getCurrentCarDriver;