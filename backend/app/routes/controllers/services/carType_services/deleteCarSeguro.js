const { Cars } = require("../../../../db/index");

/**
 * Delete the seguro field of one car
 * @param {Number} carId
 */

const deleteCarSeguroById = async (carId) => {
  Cars.update({ seguro: null },{ where: { id: carId } });
};

module.exports = deleteCarSeguroById;
