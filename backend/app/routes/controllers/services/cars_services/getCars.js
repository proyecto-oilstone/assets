const { Cars, Provider, CarType } = require("../../../../db/index");
const { Op } = require("sequelize");

const getCars = async (req, res) => {
  const { nombreLargoTipo, activo, nombreLargoProveedor, patente, año} = req.query;

  let query = {
    where: {},
    attributes: ["id", "patente", "activo", "año"],
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
      
    };
    const { Provider, CarType, ...rest } = car;
    return rest;
  });
  cars = { ...cars };
  res.status(200).json(cars);
};

module.exports = getCars;
