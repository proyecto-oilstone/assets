const { CarType } = require("../../../../db/index");

const postCarType = async (req, res) => {
  const { marca, modelo } = req.body;

  try {
    const carType = await CarType.create({
      marca,
      modelo,
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
