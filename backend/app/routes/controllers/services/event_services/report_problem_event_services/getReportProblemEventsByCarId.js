const { ReportProblemEvent, Event } = require("../../../../../db/index");
const { eventTypes } = require("../../../../../utils/constants");

const getReportProblemEventsByCarId = async (req, res) => {
  const carId = req.params.id;

  let query = {
    where: {
        carId,
        type: eventTypes.REPORT_PROBLEM,
    },
    attributes: ["id", "createdAt", "updatedAt", "carId"],
    include: [
      {
        model: ReportProblemEvent,
        attributes: ["problem", "description"],
        where: {},
        required: true,
      },
    ]
  };

  let reportProblemsEvents = await Event.findAll(query);
  reportProblemsEvents = reportProblemsEvents.map(rpe => ({
    id: rpe.id,
    problem: rpe.ReportProblemEvent.problem,
    description: rpe.ReportProblemEvent.description,
    type: "REPORT_PROBLEM",
    carId: rpe.carId,
    createdAt: rpe.createdAt,
    updatedAt: rpe.updatedAt,
  }));

  res.status(200).json(reportProblemsEvents);
};
  
module.exports = getReportProblemEventsByCarId;
