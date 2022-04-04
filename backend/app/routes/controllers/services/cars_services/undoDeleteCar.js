const { Cars, DischargedCarEvent, } = require("../../../../db/index");
const eventService = require("../event_services/event");
const { updateCarStatus } = require("./updateStatus");

/**
 * Undo delete car
 * 
 * @param {Number} req.params.id
 */

const undoDeleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Cars.findOne({ where: { id } });
    if (!car) {
      return res.status(500).send("El vehiculo no existe");
    }
    await updateCarStatus(car.id, "OUT_OF_SERVICE");
    return res.status(200).json({ message: "Ok" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = undoDeleteCar;
