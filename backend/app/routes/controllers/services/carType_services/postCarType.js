const { CarType } = require("../../../../db/index");
const { typeVehicles } = require("../../../../utils/constants");

/**
 * Creates a new CarType
 * @param {Object} req.body 
 * @returns {carType} response with the CarType created
 */

const postCarType = async (req, res) => {
  const { nombreLargo, nombreCorto, observaciones, type } = req.body;
  const typeNumber = typeVehicles[type];

  try {
    const carType = await CarType.create({
      nombreLargo,
      nombreCorto,
      observaciones,
      type: typeNumber,
    });

    carType.dataValues.type = type;
    res.status(200).json({
      message: "CarType created",
      carType,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = postCarType;
