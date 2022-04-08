const { ReportProblemEvent, RepairRequestEvent, Event, Files } = require("../../../../db/index");
const { getEventsByCarIdAndEventType, postEvent } = require("./event");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");
const getAllPendingProblemsByCarId = require("./getAllPendingProblemsByCarId");
const getAllResolvingProblemsByCarId = require("./getAllResolvingProblemsByCarId");

/**
 * set resolving=true to a list of problems
 * @param {Number} carId
 * @param {Array} reportsProblemsIds ids of ReportProblemEvent
 * @param {Number} providerId id of the provider of type workshop where will be repaired
 * @param {String} estimatedDate
 */
const resolvingReportsProblems = async (carId, reportsProblemsIds, providerId, estimatedDate, kilometres) => {
  let now = new Date()
  now = now.toISOString().split('T')[0];
  reportsProblemsIds.forEach(reportProblemId => {
    const repairRequestEvent = { carId, problemId: reportProblemId, estimatedDate, kilometres };
    postEvent(repairRequestEvent, RepairRequestEvent);
  });
  return ReportProblemEvent.update({ resolving: true, resolvingDate: now, resolved: false, providerId }, { where: { id: reportsProblemsIds } });
};

/**
 * Deletes the files of one ReportProblem (prmFileId, prmFileId)
 * @param {ReportProblem} reportProblem 
 */
const removeFilesFromReportProblem = (reportProblem) => {
  reportProblem = reportProblem.ReportProblemEvent;
  if (reportProblem.prmFileId !== null) {
    const fileId = reportProblem.prmFileId;
    Files.destroy({ where: { id: fileId } });
  }
  if (reportProblem.dataFileId !== null) {
    const fileId = reportProblem.dataFileId;
    Files.destroy({ where: { id: fileId } });
  }
}

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
   * Set 'resolving' field in true and set the car status in repair
   * @param {Number} carId 
   * @param {Array} problemsIds 
   * @param {Number} providerId workshop where will be resolving the problems
   * @param {String} estimatedDate 
   */
  resolvingProblems: async (carId, problemsIds, providerId, estimatedDate, kilometres) => {
    const car = await getCarDetail(carId);
    if (car.status !== "INFORMED") throw new Error("car must be informed first");
    await resolvingReportsProblems(carId, problemsIds, providerId, estimatedDate, kilometres);
    await updateCarStatus(car.id, "REPAIR");
  },

  /**
   * Remove all problems of one car that are not resolved yet or they are resolving
   * @param {Car} car
   * @returns {Boolean} true if any problem was removed
   */
  removeNotResolvedAndResolvingProblems: async (carId) => {
    const pendingProblems = await getAllPendingProblemsByCarId(carId);
    const resolvingProblems = await getAllResolvingProblemsByCarId(carId);
    if (pendingProblems.length === 0 && resolvingProblems.length === 0) return false;
    const onlyIds = problem => problem.id;
    pendingProblems.forEach(removeFilesFromReportProblem);
    resolvingProblems.forEach(removeFilesFromReportProblem);
    const pendingProblemsIds = pendingProblems.map(onlyIds);
    const resolvingProblemsIds = resolvingProblems.map(onlyIds);
    const reportProblemsIds = pendingProblemsIds.concat(resolvingProblemsIds);
    ReportProblemEvent.destroy({ where: { id: reportProblemsIds } });
    Event.destroy({ where: { id: reportProblemsIds } });
    return true;
  },
}
