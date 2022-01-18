const { Cars, Provider, CarType } = require("../../../../db/index");

const getCarDetail = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { id },
    attributes: ["id", "patente", "activo"],
    include: [
      {
        model: Provider,
        attributes: ["nombreLargo"],
        where: {},
        required: true,
      },
      {
        model: CarType,
        attributes: ["nombreLargo", "año"],
        where: {},
        required: true,
      },
    ],
  };

  let car = await Cars.findOne(query);

  if (!car) {
    return res.status(404).send("Car not found");
  }

  car = {
    id: car.id,
    patente: car.patente,
    activo: car.activo,
    proveedor: car.dataValues.Provider.nombreLargo,
    modelo: car.dataValues.CarType.nombreLargo,
    año: car.dataValues.CarType.año,
  };
  res.status(200).json(car);
};

module.exports = getCarDetail;
