const { Sector, Cars } = require("../../../../db/index");

/**
 * Finds a sector by id, includes cars DB model
 * @param {Number} req.params.id 
 * @returns {Sector} with information
 */

const getSectorDetail = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { id },
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones"],
    order: [["id", "ASC"]],
    include: [
      {
        model: Cars,
        attributes: ["id", "patente", "año"],
        where: {},
        required: false,
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
    vehiculos: sector.dataValues.Cars?.map((car) => {
      car = {
        id: car.id,
        patente: car.patente,
        año: car.año,
      };
      return car;
    }),
  };
  return res.status(200).json(sector);
};

module.exports = getSectorDetail;
