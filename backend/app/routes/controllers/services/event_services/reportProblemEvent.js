const { ReportProblemEvent, RepairRequestEvent, Event } = require("../../../../db/index");
const { getEventsByCarIdAndEventType, postEvent } = require("./event");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");

/**
 * set resolving=true to a list of problems
 * @param {Number} carId
 * @param {Array} reportsProblemsIds ids of ReportProblemEvent
 * @param {Number} providerId id of the provider of type workshop where will be repaired
 * @param {String} estimatedDate
 */
const resolvingReportsProblems = async (carId, reportsProblemsIds, providerId, estimatedDate) => {
  let now = new Date()
  now = now.toISOString().split('T')[0];
  reportsProblemsIds.forEach(reportProblemId => {
    const repairRequestEvent = { carId, problemId: reportProblemId, estimatedDate };
    postEvent(repairRequestEvent, RepairRequestEvent);
  });
  return ReportProblemEvent.update({ resolving: true, resolvingDate: now, resolved: false, providerId }, { where: { id: reportsProblemsIds } });
};

module.exports = {
  postReportProblemEvent: async (eventParam) => {
    const event = {
      ...eventParam,
      resolved: false,
    }
    const car = await getCarDetail(event.carId);

    let availableStatuses = ["IN_USE", "AVAILABLE", "INFORMED", "REPAIR", "RESERVED"];
    let newCarStatus = "INFORMED";
    if (car.status === "REPAIR") {
      newCarStatus = "REPAIR";
    }

    const isValidStatus = availableStatuses.some(status => status === car.status);
    if (isValidStatus) {
      const eventCreated = await postEvent(event, ReportProblemEvent);
      if (eventCreated) {
        await updateCarStatus(car.id, newCarStatus);
        return eventCreated;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },

  getReportProblemEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, ReportProblemEvent);
  },

  resolvingReportsProblems,

  /**
   * Finish to resolve all current resolving problems of one car. one resolving problem is one problem with resolving=true
   * @param {Number} carId 
   */
  resolveProblems: async (reportsProblemsIds) => {
    let now = new Date()
    now = now.toISOString().split('T')[0];
    return ReportProblemEvent.update({ resolving: false, resolved: true, resolvedDate: now, }, { where: { id: reportsProblemsIds } });
  },

  /**
   * One problem pending is one problem that is not resolved and not resolving
   * @param {Number} carId
   * @returns {Array} {ReportProblemEvent} problems pending
   */
  getAllPendingProblemsByCarId: async (carId) => {
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
  },

  /**
   * One is problem is resolving if resolving=true and resolved=false
   * @param {Number} carId 
   * @returns 
   */
  getAllResolvingProblemsByCarId: async (carId) => {
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
  },

  /**
   * Set 'resolving' field in true and set the car status in repair
   * @param {Number} carId 
   * @param {Array} problemsIds 
   * @param {Number} providerId workshop where will be resolving the problems
   * @param {String} estimatedDate 
   */
  resolvingProblems: async (carId, problemsIds, providerId, estimatedDate) => {
    const car = await getCarDetail(carId);
    if (car.status !== "INFORMED") throw new Error("car must be informed first");
    await resolvingReportsProblems(carId, problemsIds, providerId, estimatedDate);
    await updateCarStatus(car.id, "REPAIR");
  },
}
