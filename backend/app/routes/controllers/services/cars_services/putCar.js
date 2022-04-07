const { Cars, Files, Sector, EditCarEvent } = require("../../../../db/index");
const { statusCarToString } = require("../../../../utils/functions");
const { postEvent } = require("../event_services/event");

/**
 * Finds a car by id, and updates it
 * @param {Number} id 
 * @param {Object} car 
 * @param {Boolean} createEditionEvent (optional default false) true if you want to create one
 * event of type @EditCarEvent and save it in the history of car or false to skip @EditCarEvent
 * @returns The car with the updated information
 */

const putCar = async (id, car, createEditionEvent = false) => {
  try {
    await Cars.update(car, { where: { id } });
    const editedCar = await Cars.findOne({ where: { id } }, { include: [Sector], attributes: ['nombreLargo'], required: false });
    if (createEditionEvent) {
      const editedCarEvent = await postEvent({ carId: editedCar.id, kilometres: car.kilometres }, EditCarEvent);
      editedCar.dataValues.kilometres = editedCarEvent.kilometres;
    }
    editedCar.status = statusCarToString(editedCar.status);
    return editedCar;
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = putCar;
