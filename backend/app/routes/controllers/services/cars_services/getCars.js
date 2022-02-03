const { Cars, Provider, CarType, Files } = require("../../../../db/index");
const { Op } = require("sequelize");
const { statusCarToString } = require("../../../../utils/functions");

const getCars = async (req, res) => {
  const { nombreLargoTipo, activo, nombreLargoProveedor, patente, año} = req.query;

  let query = {
    where: {},
    attributes: ["id", "patente", "activo", "año", "status"],
    order: [["patente", "ASC"]],
    include: [
      {
        model: Provider,
        attributes: ["nombreLargo"],
        where: {},
        required: true,
      },
      {
        model: CarType,
        attributes: ["nombreLargo", "nombreCorto"],
        where: {},
        required: true,
      },
      {
        model: Files,
        attributes: ["id", "name", "type", "document"],
        where: {},
        required: false,
      }
    ],
  };
  if (nombreLargoTipo) {
    query.where[1].nombreLargo = { ...query.include[1].where, nombreLargo: { [Op.like]: `%${nombreLargoTipo}%` } };
  }
  if (activo) {
    query.where = { ...query.where, activo };
  }
  if (patente) {
    query.where = { ...query.where, patente: { [Op.like]: `%${patente}%` } };
  }
  if (nombreLargoProveedor) {
    query.where[0].nombreLargo = { ...query.include[0].where, nombreLargo: { [Op.like]: `%${nombreLargoProveedor}%` } };
  }
  if (año) {
    query.where = { ...query.where, año: { [Op.like]: `%${año}%` } };
  }

  let cars = await Cars.findAll(query);

  cars = cars.map((car) => {
    car = {
      ...car.dataValues,
      proveedor: car.dataValues.Provider.nombreLargo,
      modelo: car.dataValues.CarType.nombreLargo,
      marca: car.dataValues.CarType.nombreCorto,
      Files: car.dataValues.Files[0]?.name,
      status: statusCarToString(car.status),
      
        
      
    };
    const { Provider, CarType, ...rest } = car;
    return rest;
  });
  cars = { ...cars };
  res.status(200).json(cars);
};

module.exports = getCars;
