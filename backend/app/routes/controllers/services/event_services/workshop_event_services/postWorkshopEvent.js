const { WorkshopEvent, Event } = require("../../../../../db/index");
const { eventTypes } = require("../../../../../utils/constants");

const postWorkshopEvent = async (req, res) => {
  const { carId, createdAt, providerId } = req.body;
  
  try {
    const we = await WorkshopEvent.create({
      providerId,
      Event: {
        type: eventTypes.WORKSHOP,
        createdAt,
        carId,
      }
    }, {
      include: [ Event ]
    });

    const workshopEvent = {
      id: we.id,
      providerId: we.providerId,
      type: "WORKSHOP",
      carId: we.Event.carId,
      createdAt: we.Event.createdAt,
      updatedAt: we.Event.updatedAt,
    };

    res.status(200).json(workshopEvent);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
  
module.exports = postWorkshopEvent;