const { getVTVEventById } = require("../event_services/vtvEvent");
const getCarDetail = require("./getCarDetail");

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
