const { CarType } = require("../../../../db/index");

const getCarTypeDetail = async (req, res) => {
  const { id } = req.params;
  let query = {
    where: { id },
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones", "año"],
  };
  let carType = await CarType.findOne(query);

  if (!carType) {
    return res.status(404).send("CarType not found");
  }
  carType = {
    id: carType.id,
    nombreLargo: carType.nombreLargo,
    nombreCorto: carType.nombreCorto,
    observaciones: carType.observaciones,
    año: carType.año,
  };
  res.status(200).json(carType);
};

module.exports = getCarTypeDetail;
