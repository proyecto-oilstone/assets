const { CarType } = require("../../../../db/index");

const getCarTypes = async (req, res) => {
  let query = {
    where: {},
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones",],
    order: [["nombreLargo", "ASC"]],
  };

  let carTypes = await CarType.findAll(query);

  carTypes = carTypes.map((carType) => {
    carType = {
      ...carType.dataValues,
    };
    const { ...rest } = carType;
    return rest;
  });
  carTypes = { ...carTypes };
  res.status(200).json(carTypes);
};

module.exports = getCarTypes;
