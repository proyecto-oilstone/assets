const { Files } = require("../../../../db/index");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");

/**
 * Check if one car have files or not, if have files and the status is out of service then update the status to available
 * if the car not have any file and the status is not out of the service then update the current status to out of service
 * @param {Number} carId 
 * @returns {Car} with status updated
 */
const checkCarFiles = async (carId) => {
  const car = await getCarDetail(carId);
  const hasMandatoryDocumentation = car.VTV !== null && car.seguro !== null;
  if (hasMandatoryDocumentation && car.status === "OUT_OF_SERVICE") {
    await updateCarStatus(car.id, "AVAILABLE");
    car.status = "AVAILABLE";
  } else if (car.documento.length === 0 && car.status !== "OUT_OF_SERVICE") {
    await updateCarStatus(car.id, "OUT_OF_SERVICE");
    car.status = "OUT_OF_SERVICE";
  }

  return car;
};

module.exports = checkCarFiles
