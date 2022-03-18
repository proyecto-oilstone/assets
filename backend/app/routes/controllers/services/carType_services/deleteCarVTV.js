const { Cars } = require("../../../../db/index");

/**
 * Delete the vtv field of one car
 * @param {Number} carId
 */

const deleteCarVtvById = async (carId) => {
  Cars.update({ VTV: null },{ where: { id: carId } });
};

module.exports = deleteCarVtvById;