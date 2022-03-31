const { Garage, Cars, Event, DriverEvent } = require("../../../../db/index");
const { statusCarToString } = require("../../../../utils/functions");

const getGarageDetail = async (id) => {
  let query = {
    where: { id },
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones"],
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

  let garage = await Garage.findOne(query);

  if (!garage) {
    return res.status(404).send("Garage not found");
  }

  garage = {
    id: garage.id,
    nombreLargo: garage.nombreLargo,
    nombreCorto: garage.nombreCorto,
    observaciones: garage.observaciones,
    vehiculos: garage.dataValues.Cars?.map((car) => {
      car = {
        id: car.id,
        patente: car.patente,
        año: car.año,
        status: statusCarToString(car.status),
        driver: car.Events?.map((event) => {
          return event.dataValues.DriverEvent?.dataValues.driver;
        }),
      };
      return car;
    }),
  };
  
  return garage;
};

module.exports = getGarageDetail;
