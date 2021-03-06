const { CarType, Cars } = require("../../../../db/index");
const { typeVehicleToString } = require("../../../../utils/functions");

/**
 * Finds CarType by id
 * @param {Number} req.params.id
 * 
 * @returns {carType} with all the information
 */

const getCarTypeDetail = async (req, res) => {
  const { id } = req.params;
  let query = {
    where: { id },
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones", "type"],
    include: [
      {
        model: Cars,
        attributes: ["id", "patente", "año"],
        where: {},
        required: true,
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
    type: typeVehicleToString(carType.type),
    vehiculos: carType.Cars.map(car => {
      car = {
        id: car.id,
        patente: car.patente,
        año: car.año
      }
      return car;
    })
  };
  res.status(200).json(carType);
};

module.exports = getCarTypeDetail;
