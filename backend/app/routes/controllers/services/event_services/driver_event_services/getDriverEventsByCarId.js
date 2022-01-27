const { DriverEvent, Event } = require("../../../../../db/index");
const { eventTypes } = require("../../../../../utils/constants");

const getDriverEventsByCarId = async (req, res) => {
  const carId = req.params.id;

  let query = {
    where: {
      carId,
      type: eventTypes.DRIVER,
    },
    attributes: ["id", "createdAt", "updatedAt", "carId"],
    include: [
      {
        model: DriverEvent,
        attributes: ["driver"],
        where: {},
        required: true,
      },
    ]
  };

  let driverEvents = await Event.findAll(query);
  driverEvents = driverEvents.map(de => ({
    id: de.id,
    driver: de.DriverEvent.driver,
    type: "DRIVER",
    carId: de.carId,
    createdAt: de.createdAt,
    updatedAt: de.updatedAt,
  }));

  res.status(200).json(driverEvents);
};
  
module.exports = getDriverEventsByCarId;
