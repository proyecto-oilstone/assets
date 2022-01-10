const { Cars, Provider, CarType } = require("../../../../db/index");
const { Op } = require("sequelize");

const getCars = async (req, res) => {
  const { nombreLargoTipo, asignado, activo, nombreLargoProveedor, patente } = req.query;

  let query = {
    where: {},
    attributes: ["id", "patente", "asignado", "activo"],
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
        attributes: ["nombreLargo",],
        where: {},
        required: true,
      },
    ],
  };
  if (nombreLargoTipo) {
    query.where[1].nombreLargo = { ...query.include[1].where, nombreLargo: { [Op.like]: `%${nombreLargoTipo}%` } };
  }
  if (asignado) {
    query.where = { ...query.where, asignado: { [Op.like]: `%${asignado}%` } };
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

  let cars = await Cars.findAll(query);

  cars = cars.map((car) => {
    car = {
      ...car.dataValues,
      proveedor: car.dataValues.Provider.nombreLargo,
      modelo: car.dataValues.CarType.nombreLargo,
      
    };
    const { Provider, CarType, ...rest } = car;
    return rest;
  });
  cars = { ...cars };
  res.status(200).json(cars);
};

module.exports = getCars;
