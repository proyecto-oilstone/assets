const { ReportProblemEvent, Event } = require("../../../../../db/index");
const { eventTypes } = require("../../../../../utils/constants");

const postReportProblemEvent = async (req, res) => {
  const { carId, createdAt, problem, description } = req.body;
  
  try {
    const rpe = await ReportProblemEvent.create({
      problem,
      description,
      Event: {
        type: eventTypes.REPORT_PROBLEM,
        createdAt,
        carId,
      }
    }, {
      include: [ Event ]
    });

    const reportProblemEvent = {
      id: rpe.id,
      problem: rpe.problem,
      description: rpe.description,
      type: "REPORT_PROBLEM",
      carId: rpe.Event.carId,
      createdAt: rpe.Event.createdAt,
      updatedAt: rpe.Event.updatedAt,
    };

    res.status(200).json(reportProblemEvent);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
  
module.exports = postReportProblemEvent;