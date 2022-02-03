const { Cars } = require("../../../../db/index");
const { carStates } = require("../../../../utils/constants");

/**
 * Change the current status of one car to ${status}
 * @param {Number} carId 
 * @param {Number or String} status the String status of status or the status number
 * @returns {Boolean} true if was changed, false if not
 */
module.exports = {
  updateCarStatus: async (carId, status) => {
    if (typeof status === "string") {
      status = carStates[status];
    }
    try {
      await Cars.update(
        { status },
        { where: { id: carId } }
      );
      return true;
    } catch (e) {
      return false;
    }
  },
}
