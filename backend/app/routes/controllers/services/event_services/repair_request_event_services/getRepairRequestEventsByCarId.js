const { RepairRequestEvent, Event } = require("../../../../../db/index");
const { eventTypes } = require("../../../../../utils/constants");

const getRepairRequestEventsByCarId = async (req, res) => {
  const carId = req.params.id;

  let query = {
    where: {
      carId,
      type: eventTypes.REPAIR,
    },
    attributes: ["id", "createdAt", "updatedAt", "carId"],
    include: [
      {
        model: RepairRequestEvent,
        attributes: ["problemId", "providerId"],
        where: {},
        required: true,
      },
    ]
  };

  let repairRequestEvents = await Event.findAll(query);
  repairRequestEvents = repairRequestEvents.map(rre => ({
    id: rre.id,
    problemId: rre.RepairRequestEvent.problemId,
    providerId: rre.RepairRequestEvent.providerId,
    type: "REPAIR",
    carId: rre.carId,
    createdAt: rre.createdAt,
    updatedAt: rre.updatedAt,
  }));

  res.status(200).json(repairRequestEvents);
};
  
module.exports = getRepairRequestEventsByCarId;
