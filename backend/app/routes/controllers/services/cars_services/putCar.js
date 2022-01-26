const { Cars } = require("../../../../db/index");

const putCar = async (req, res) => {
  const { id } = req.params;
  const { patente,  activo, ProviderId, CarTypeId, año, SectorId } = req.body;

  try {
    await Cars.update({ patente, activo, ProviderId, CarTypeId, año, SectorId }, { where: { id } });
    const car = await Cars.findOne({ where: { id } });
    res.status(200).json(car);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = putCar;
