const { ReportProblemEvent, Event } = require("../../../../db/index");

/**
 * One problem pending is one problem that is not resolved and not resolving
 * @param {Number} carId
 * @returns {Array} {ReportProblemEvent} problems pending
 */
 const getAllPendingProblemsByCarId = async (carId) => {
  let query = {
    where: {
      carId,
    },
    include: [
      {
        model: ReportProblemEvent,
        where: { resolving: false, resolved: false },
        required: true,
      },
    ],
  };
  
  return Event.findAll(query);
}

module.exports = getAllPendingProblemsByCarId;