const { Provider, Cars, Event, DriverEvent } = require("../../../../db/index");
const { typeProviderToString, statusCarToString } = require("../../../../utils/functions");

/**
 * Finds a provider by id
 * @param {Number} req.params.id
 * @returns {provider} with information
 */

const getProviderDetail = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { id },
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones", "type"],
    include: [
      {
        model: Cars,
        attributes: ["id", "patente", "año", "status"],
        where: {},
        required: false,
        include: [
          {
            model: Event,
            attributes: ["id", "type"],
            where: {},
            required: false,
            include: [
              {
                model: DriverEvent,
                attributes: ["id", "driver", "isReserved"],
                where: {},
                required: true,
                order: [["id", "DESC"]],
              },
            ],
          },
        ],
      },
    ],
  };
  let provider = await Provider.findOne(query);

  if (!provider) {
    return res.status(404).send("Provider not found");
  }

  let cars = await Cars.findAll({
    where: { WorkshopId: provider.id },
    attributes: ["id", "patente", "año", "status", "WorkshopId"],
    required: false,
    include: [
      {
        model: Event,
        attributes: ["id", "type"],
        where: {},
        required: false,
        include: [
          {
            model: DriverEvent,
            attributes: ["id", "driver", "isReserved"],
            where: {},
            required: true,
            order: [["id", "DESC"]],
          },
        ],
      },
    ],
  });

  let allCars;
  let arr;
  let arr2;

  if (cars) {
    arr = provider.dataValues.Cars?.map((car) => {
      return {
        id: car.id,
        patente: car.patente,
        año: car.año,
        status: statusCarToString(car.status),
        driver: car.Events?.map((event) => {
          return event.dataValues.DriverEvent?.dataValues.driver;
        }),
      };
    });
    arr2 = cars.map((car) => {
      return {
        id: car.id,
        patente: car.patente,
        año: car.año,
        status: statusCarToString(car.status),
        driver: car.Events?.map((event) => {
          return event.dataValues.DriverEvent?.dataValues.driver;
        }),
      };
    });

    allCars = [...arr, ...arr2];
  }

  provider = {
    id: provider.id,
    nombreLargo: provider.nombreLargo,
    nombreCorto: provider.nombreCorto,
    observaciones: provider.observaciones,
    type: typeProviderToString(provider.type),
    vehiculos: allCars,
  };
  res.status(200).json(provider);
};

module.exports = getProviderDetail;
