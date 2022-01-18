const { CarType } = require("../../../../db/index");

const putCarType = async (req, res) => {
  const { id } = req.params;
  const { nombreLargo, nombreCorto, observaciones, año } = req.body;

  try {
    await CarType.update({ nombreLargo, nombreCorto, observaciones, año }, { where: { id } });
    const carType = await CarType.findOne({ where: { id } });
    res.status(200).json(carType);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = putCarType;
