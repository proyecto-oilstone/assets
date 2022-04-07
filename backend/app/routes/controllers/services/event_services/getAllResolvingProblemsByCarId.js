const { ReportProblemEvent, Event } = require("../../../../db/index");

/**
 * One problem is resolving if resolving=true and resolved=false
 * @param {Number} carId 
 * @returns 
 */
const getAllResolvingProblemsByCarId = async (carId) => {
  let query = {
    where: {
      carId,
    },
    include: [
      {
        model: ReportProblemEvent,
        where: { resolving: true, resolved: false },
        required: true,
      },
    ],
  };
  
  return Event.findAll(query);
}

module.exports = getAllResolvingProblemsByCarId;