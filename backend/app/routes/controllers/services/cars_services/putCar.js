const { Cars } = require("../../../../db/index");

const putCar = async (req, res) => {
  const { id } = req.params;
  const { patente, asignado, activo, ProviderId, CarTypeId } = req.body;

  try {
    await Cars.update({ patente, asignado, activo, ProviderId, CarTypeId }, { where: { id } });
    const car = await Cars.findOne({ where: { id } });
    res.status(200).json(car);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = putCar;
