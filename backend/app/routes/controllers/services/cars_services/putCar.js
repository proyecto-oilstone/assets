const { Cars, Files } = require("../../../../db/index");
const { statusCarToString } = require("../../../../utils/functions");

const putCar = async (id, car) => {
  try {
    await Cars.update(car, { where: { id } });
    return Cars.findOne({ where: { id } });
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = putCar;
