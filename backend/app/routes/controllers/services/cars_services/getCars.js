const { Cars, Provider, CarType, Files, Sector } = require("../../../../db/index");
const { Op } = require("sequelize");
const { statusCarToString } = require("../../../../utils/functions");
const getCurrentCarDriver = require("./getCurrentCarDriver");
const eventService = require("../event_services/event");

/**
 * Gets all the cars, includes all other Database models linked to Cars ,checks req.query for filters
 * 
 * @param {Number or String} req.query
 * @returns {cars} all the cars with information
 */

const getCars = async (req, res) => {
  const { nombreLargoTipo, nombreLargoProveedor, patente, año} = req.query;

  let query = {
    where: {},
    attributes: ["id", "patente", "año", "status", "VTV", "seguro"],
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
      },
      {
        model: Sector,
        attributes: ["id", "nombreLargo", "nombreCorto", "observaciones"],
        where: {},
        required: false,
      }
    ],
  };
  if (nombreLargoTipo) {
    query.where[1].nombreLargo = { ...query.include[1].where, nombreLargo: { [Op.like]: `%${nombreLargoTipo}%` } };
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

  cars = await Promise.all(cars.map(async (car) => {
    const kilometres = await eventService.getLastKilometresUploaded(car.id);
    car = {
      ...car.dataValues,
      proveedor: car.dataValues.Provider.nombreLargo,
      modelo: car.dataValues.CarType.nombreLargo,
      marca: car.dataValues.CarType.nombreCorto,
      Files: car.dataValues.Files?.find(file => file.document === "permanent"),
      status: statusCarToString(car.status),
      currentDriver: await getCurrentCarDriver(car),
      kilometres,
    };
    const { Provider, CarType, ...rest } = car;
    return rest;
  }));
  cars = { ...cars };
  res.status(200).json(cars);
};

module.exports = getCars;
