const { Cars, Files } = require("../../../../db/index");

const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Cars.findOne({ where: { id } });
    if (!car) {
      return res.status(500).send("El vehiculo no existe");
    }
    if (!car.activo) {
      await Files.destroy({ where: { CarId: id } });
      await Cars.destroy({ where: { id } });
      return res.status(200).json({ message: "Car deleted" });
    }
    res.status(500).send("El vehiculo no puede ser eliminado porque esta activo");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = deleteCar;
