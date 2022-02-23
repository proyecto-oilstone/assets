const { Cars, Files, Sector } = require("../../../../db/index");
const { statusCarToString } = require("../../../../utils/functions");

/**
 * Finds a car by id, and updates it
 * @param {Number} id 
 * @param {Object} car 
 * @returns The car with the updated information
 */

const putCar = async (id, car) => {
  try {
    await Cars.update(car, { where: { id } });
    return Cars.findOne({ where: { id } }, { include: [Sector], attributes: ['nombreLargo'], required: false });
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = putCar;
