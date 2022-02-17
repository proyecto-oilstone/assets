const { getSeguroEventById } = require("../event_services/seguroEvent");
const getCarDetail = require("./getCarDetail");

/**
 * Finds a car by id, checks if it has a seguro, if it does, it returns the seguro event
 * 
 * @param {Number} id 
 * @returns {seguroEvent}
 */

const downloadSeguroByCarId = async (id) => {
  try {
    const car = await getCarDetail(id);
    if (car.seguro !== null) {
      const seguroEventId = car.seguro;
      const seguroEvent = await getSeguroEventById(seguroEventId);
      return seguroEvent;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

module.exports = downloadSeguroByCarId;
