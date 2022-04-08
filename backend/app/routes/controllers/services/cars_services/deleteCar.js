const { Cars, DischargedCarEvent, } = require("../../../../db/index");
const eventService = require("../event_services/event");
const reportProblemService = require("../event_services/reportProblemEvent");
const { updateCarStatus } = require("./updateStatus");

/**
 * Check if the car exists, if it exists then checks if the car is active, if it is not active then deletes the car
 * 
 * @param {Number} req.params.id
 * @returns message with the result of the operation
 */

const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Cars.findOne({ where: { id } });
    if (!car) {
      return res.status(500).send("El vehiculo no existe");
    }
    await updateCarStatus(car.id, "DISCHARGED");
    const anyProblemDeleted = await reportProblemService.removeNotResolvedAndResolvingProblems(car.id);
    await eventService.postEvent({ carId: car.id }, DischargedCarEvent);
    return res.status(200).json({ message: "Car deleted", anyProblemDeleted });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = deleteCar;
