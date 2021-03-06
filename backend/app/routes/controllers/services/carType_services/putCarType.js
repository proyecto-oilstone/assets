const { CarType } = require("../../../../db/index");
const { typeVehicles } = require("../../../../utils/constants");


/**
 * finds a carType by id, and updates it
 * 
 * @param {Number} req.params.id 
 * @param {Object} req.body
 * @returns {carType} response with the CarType updated
 */

const putCarType = async (req, res) => {
  const { id } = req.params;
  const { nombreLargo, nombreCorto, observaciones, type } = req.body;
  const typeNumber = typeVehicles[type];

  try {
    await CarType.update({ nombreLargo, nombreCorto, observaciones, type: typeNumber}, { where: { id } });
    const carType = await CarType.findOne({ where: { id } });
    carType.dataValues.type = type;
    res.status(200).json(carType);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = putCarType;
