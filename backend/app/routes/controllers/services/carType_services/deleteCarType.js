const { CarType, Cars } = require("../../../../db/index");

const deleteCarType = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Cars.findOne({ where: { CarTypeId: id } });
    const carType = await CarType.findOne({ where: { id } });
    if (!carType) {
      return res.status(500).send("El tipo de vehiculo no existe");
    }

    if (!car) {
      await CarType.destroy({ where: { id } });
      return res.status(200).json({ message: "CarType deleted" });
    }
    res.status(500).send("El tipo de vehiculo no puede ser eliminado porque esta asignado a un vehiculo");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = deleteCarType;
