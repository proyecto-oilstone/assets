const { Cars, Files } = require("../../../../db/index");
const { statusCarToString } = require("../../../../utils/functions");

const putCar = async (req, res) => {
  const { id } = req.params;
  const { patente,  activo, ProviderId, CarTypeId, año, SectorId } = req.body;

  try {
    await Cars.update({ patente, activo, ProviderId, CarTypeId, año, SectorId }, { where: { id } });
    let car = await Cars.findOne({ where: { id }, include:[{model: Files, attributes:["name"], where: {}, required:false},] });
    car = {
      id: car.id,
      patente: car.patente,
      activo: car.activo,
      ProviderId: car.ProviderId,
      CarTypeId: car.CarTypeId,
      año: car.año,
      SectorId: car.SectorId,
      Files: car.dataValues.Files[0]?.name,
      status: statusCarToString(car.status),
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = putCar;
