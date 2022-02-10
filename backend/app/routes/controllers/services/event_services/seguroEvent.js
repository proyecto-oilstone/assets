const { SeguroEvent } = require("../../../../db/index");
const putCar = require("../cars_services/putCar");
const checkCarFiles = require("../files_services/checkCarFiles");
const { postEvent } = require("./event");

module.exports = {
  postSeguroEvent: async (event) => {
    const createdEvent = await postEvent(event, SeguroEvent);
    await putCar(createdEvent.carId, { seguro: createdEvent.id });
    await checkCarFiles(createdEvent.carId);
    return createdEvent;
  },

  getSeguroEventById: async (id) => {
    return SeguroEvent.findOne({ where: { id } });
  },
}
