const { Cars, Files } = require("../../../../db/index");

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
    await Files.destroy({ where: { CarId: id } });
    await Cars.destroy({ where: { id } });
    return res.status(200).json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = deleteCar;
