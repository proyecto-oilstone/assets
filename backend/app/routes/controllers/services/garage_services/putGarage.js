const { Garage } = require("../../../../db/index");

const putGarage = async (req, res) => {
  const { id } = req.params;
  const { nombreLargo, nombreCorto, observaciones } = req.body;
  await Garage.update({ nombreLargo, nombreCorto, observaciones }, { where: { id } });
  const garage = await Garage.findOne({ where: { id } });
  res.status(200).json(garage);
};

module.exports = putGarage;