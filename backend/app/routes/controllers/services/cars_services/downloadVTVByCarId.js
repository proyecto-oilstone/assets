const { getVTVEventById } = require("../event_services/vtvEvent");
const getCarDetail = require("./getCarDetail");

/**
 * Finds a car by id, checks if it has a VTV, if it does, it returns the VTV event
 * 
 * @param {Number} id 
 * @returns {VTVEvent}
 */

const downloadVTVByCarId = async (id) => {
  try {
    const car = await getCarDetail(id);
    if (car.VTV !== null) {
      const vtvEventId = car.VTV;
      const vtvEvent = await getVTVEventById(vtvEventId);
      return vtvEvent;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

module.exports = downloadVTVByCarId;
