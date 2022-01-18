const { Cars } = require("../../../../db/index");

const postCars = async (req, res) => {
  const { patente, ProviderId, CarTypeId } = req.body;

  try {
    const car = await Cars.create({
      patente,
      
    });
    try {
      await car.setProvider(ProviderId);
    } catch (error) {
      throw new Error("problemas seteando el providerid");
    }
    try {
      await car.setCarType(CarTypeId);
    } catch (error) {
      throw new Error("problemas seteando el cartypeid");
    }

    res.status(200).json({
      message: "Car created",
      car,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = postCars;
