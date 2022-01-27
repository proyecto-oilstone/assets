const { WorkshopEvent, Event } = require("../../../../../db/index");
const { eventTypes } = require("../../../../../utils/constants");

const getWorkshopEventsByCarId = async (req, res) => {
  const carId = req.params.id;

  let query = {
    where: {
      carId,
      type: eventTypes.WORKSHOP,
    },
    attributes: ["id", "createdAt", "updatedAt", "carId"],
    include: [
        {
          model: WorkshopEvent,
          attributes: ["providerId"],
          where: {},
          required: true,
        },
    ]
  };

  let workshopEvents = await Event.findAll(query);
  workshopEvents = workshopEvents.map(we => ({
    id: we.id,
    providerId: we.WorkshopEvent.providerId,
    description: we.WorkshopEvent.providerId,
    type: "WORKSHOP",
    carId: we.carId,
    createdAt: we.createdAt,
    updatedAt: we.updatedAt,
  }));

  res.status(200).json(workshopEvents);
};
  
module.exports = getWorkshopEventsByCarId;
