const { CarType, Cars } = require("../../../../db/index");

const getCarTypeDetail = async (req, res) => {
  const { id } = req.params;
  let query = {
    where: { id },
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones"],
    include: [
      {
        model: Cars,
        attributes: ["id", "patente", "activo", "año"],
        where: {},
        required: false,
      },
    ]
  };
  let carType = await CarType.findOne(query);

  if (!carType) {
    return res.status(404).send("CarType not found");
  }
  carType = {
    id: carType.id,
    nombreLargo: carType.nombreLargo,
    nombreCorto: carType.nombreCorto,
    observaciones: carType.observaciones,
    vehiculos: carType.Cars?.map(car => {
      car = {
        id: car.id,
        patente: car.patente,
        activo: car.activo,
        año: car.año
      }
      return car;
    })
  };
  res.status(200).json(carType);
};

module.exports = getCarTypeDetail;
