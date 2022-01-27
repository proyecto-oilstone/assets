const { RepairRequestEvent, Event } = require("../../../../../db/index");
const { eventTypes } = require("../../../../../utils/constants");

const postRepairRequestEvent = async (req, res) => {
  const { carId, createdAt, problemId, providerId } = req.body;
  
  try {
    const rre = await RepairRequestEvent.create({
      problemId,
      providerId,
      Event: {
        type: eventTypes.REPAIR,
        createdAt,
        carId,
      }
    }, {
      include: [ Event ]
    });

    const repairRequestEvent = {
      id: rre.id,
      problemId: rre.problemId,
      providerId: rre.providerId,
      type: "REPAIR",
      carId: rre.Event.carId,
      createdAt: rre.Event.createdAt,
      updatedAt: rre.Event.updatedAt,
    };

    res.status(200).json(repairRequestEvent);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
  
module.exports = postRepairRequestEvent;