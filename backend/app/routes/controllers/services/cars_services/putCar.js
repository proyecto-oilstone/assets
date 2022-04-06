const { Cars, Files, Sector, EditCarEvent } = require("../../../../db/index");
const { statusCarToString } = require("../../../../utils/functions");
const { postEvent } = require("../event_services/event");

/**
 * Finds a car by id, and updates it
 * @param {Number} id 
 * @param {Object} car 
 * @returns The car with the updated information
 */

const putCar = async (id, car) => {
  try {
    await Cars.update(car, { where: { id } });
    const editedCar = await Cars.findOne({ where: { id } }, { include: [Sector], attributes: ['nombreLargo'], required: false });
    const editedCarEvent = await postEvent({ carId: editedCar.id, kilometres: car.kilometres }, EditCarEvent);
    editedCar.status = statusCarToString(editedCar.status);
    editedCar.dataValues.kilometres = editedCarEvent.kilometres;
    return editedCar;
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = putCar;
