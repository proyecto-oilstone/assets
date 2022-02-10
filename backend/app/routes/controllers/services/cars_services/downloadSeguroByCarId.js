const { getSeguroEventById } = require("../event_services/seguroEvent");
const getCarDetail = require("./getCarDetail");

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
