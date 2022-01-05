const { Cars, Provider, CarType } = require("../../../../db/index");
const { Op } = require("sequelize");

const getCars = async (req, res) => {
  const { modelo, marca, asignado, activo, proveedor, patente } = req.query;

  let query = {
    where: {},
    attributes: ["id", "patente", "asignado", "activo"],
    order: [["patente", "ASC"]],
    include: [
      {
        model: Provider,
        attributes: ["nombre"],
        where: {},
        required: true,
      },
      {
        model: CarType,
        attributes: ["modelo", "marca"],
        where: {},
        required: true,
      },
    ],
  };
  if (modelo) {
    query.where[1].modelo = { ...query.include[1].where, modelo: { [Op.like]: `%${modelo}%` } };
  }
  if (marca) {
    query.where[1].marca = { ...query.include[1].where, marca: { [Op.like]: `%${marca}%` } };
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
  if (proveedor) {
    query.where[0].nombre = { ...query.include[0].where, nombre: { [Op.like]: `%${proveedor}%` } };
  }

  let cars = await Cars.findAll(query);

  cars = cars.map((car) => {
    car = {
      ...car.dataValues,
      proveedor: car.dataValues.Provider.nombre,
      modelo: car.dataValues.CarType.modelo,
      marca: car.dataValues.CarType.marca,
    };
    const { Provider, CarType, ...rest } = car;
    return rest;
  });
  cars = { ...cars };
  res.status(200).json(cars);
};

module.exports = getCars;
