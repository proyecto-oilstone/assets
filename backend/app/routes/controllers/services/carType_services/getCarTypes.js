const { CarType } = require("../../../../db/index");
const { typeVehicleToString } = require("../../../../utils/functions");

const getCarTypes = async (req, res) => {
  let query = {
    where: {},
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones", "type"],
    order: [["nombreLargo", "ASC"]],
  };

  let carTypes = await CarType.findAll(query);

  carTypes = carTypes.map((carType) => {
    carType = {
      ...carType.dataValues,
    };
    carType.type = typeVehicleToString(carType.type);
    const { ...rest } = carType;
    return rest;
  });
  carTypes = { ...carTypes };
  res.status(200).json(carTypes);
};

module.exports = getCarTypes;
