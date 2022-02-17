const { Cars } = require("../../../../db/index");
const { carStates } = require("../../../../utils/constants");
const { statusCarToString } = require("../../../../utils/functions");

/**
 * Creates a new car
 * 
 * @param {Object} req.body
 * @returns {car} response with the car created
 */

const postCars = async (req, res) => {
  const { patente, ProviderId, CarTypeId, año } = req.body;

  try {
    const car = await Cars.create({
      patente,
      año,
      status: carStates.OUT_OF_SERVICE,
    });
    try {
      await car.setProvider(ProviderId);
    } catch (error) {
      throw new Error("problemas seteando el providerid");
    }
    try {
      await car.setCarType(CarTypeId);
    } catch (error) {
      throw new Error("problemas seteando el cartypeid");
    }
    car.status = statusCarToString(car.status);
    res.status(200).json({
      message: "Car created",
      car,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = postCars;
