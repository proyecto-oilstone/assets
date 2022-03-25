const { Sector, Cars, Event, DriverEvent } = require("../../../../db/index");
const { statusCarToString } = require("../../../../utils/functions");

/**
 * Finds a sector by id, includes cars DB model
 * @param {Number} req.params.id
 * @returns {Sector} with information
 */

const getSectorDetail = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { id },
    attributes: ["id", "nombreLargo", "nombreCorto", "supervisor", "observaciones"],
    order: [["id", "ASC"]],
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

  let sector = await Sector.findOne(query);

  if (!sector) {
    return res.status(404).send("Sector not found");
  }

  sector = {
    id: sector.id,
    nombreLargo: sector.nombreLargo,
    nombreCorto: sector.nombreCorto,
    observaciones: sector.observaciones,
    supervisor: sector.supervisor,
    vehiculos: sector.dataValues.Cars?.map((car) => {
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
  return res.status(200).json(sector);
};

module.exports = getSectorDetail;
