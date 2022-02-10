const { VTVEvent } = require("../../../../db/index");
const putCar = require("../cars_services/putCar");
const checkCarFiles = require("../files_services/checkCarFiles");
const { postEvent } = require("./event");

module.exports = {
  postVTVEvent: async (event) => {
    const createdEvent = await postEvent(event, VTVEvent);
    await putCar(createdEvent.carId, { VTV: createdEvent.id });
    await checkCarFiles(createdEvent.carId);
    return createdEvent;
  },

  getVTVEventById: async (id) => {
    return VTVEvent.findOne({ where: { id } });
  },

}
