const { DriverEvent, Event } = require("../../../../../db/index");
const { eventTypes } = require("../../../../../utils/constants");

const postEventDriver = async (req, res) => {
  const { carId, createdAt, driver } = req.body;
  
  try {
    const de = await DriverEvent.create({
      driver,
      Event: {
        type: eventTypes.DRIVER,
        createdAt,
        carId,
      }
    }, {
      include: [ Event ]
    });

    const driverEvent = {
      id: de.id,
      driver: de.driver,
      type: "DRIVER",
      carId: de.Event.carId,
      createdAt: de.Event.createdAt,
      updatedAt: de.Event.updatedAt,
    };

    res.status(200).json(driverEvent);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
  
module.exports = postEventDriver;