const { CarType } = require("../../../../db/index");

const postCarType = async (req, res) => {
  const { nombreLargo, nombreCorto, observaciones } = req.body;

  try {
    const carType = await CarType.create({
      nombreLargo,
      nombreCorto,
      observaciones
    });

    res.status(200).json({
      message: "CarType created",
      carType,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = postCarType;
