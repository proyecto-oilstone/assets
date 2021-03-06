const { RepairRequestEvent, RepairedEvent, LastRepairedEvent } = require("../../../../db/index");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");
const { getEventsByCarIdAndEventType, postEvent } = require("./event");
const {getLastEventDifferent} = require("./getLastEventDifferent");
const { resolveProblems } = require("./reportProblemEvent");
const getAllPendingProblemsByCarId = require("./getAllPendingProblemsByCarId");
const getAllResolvingProblemsByCarId = require("./getAllResolvingProblemsByCarId");

const createRepairedEvents = (carId, reportProblems, kilometres) => {
  const problems = reportProblems.map(problem => ({ carId, problemId: problem.id, repairTypeId: problem.typeResolutionId, kilometres }));
  return problems.map(problem => postEvent(problem, RepairedEvent));
}

const updateLastRepairedEvents = async (carId, repairedEventsIds) => {
  await LastRepairedEvent.destroy({ where: { carId } })
  return repairedEventsIds.map(repairedEventId => LastRepairedEvent.create({ carId, repairedEventId }))
}

module.exports = {
  /**
   * Finish the current resolving problems of one car. If the car still have another problems the status of car
   * will be informed, if the car has not more problems the car status will be available/in use/reserved if has 
   * any driver or reserver driver before repair
   * @param {Number} carId 
   */
  finishCarRepair: async (carId, reportProblems, kilometres) => {
    const onlyIds = (p) => p.id;
    const problemsIds = reportProblems.map(onlyIds);
    const car = await getCarDetail(carId);
    if (car.status !== "REPAIR") throw new Error("nothing to repair");
    const resolvingProblems = await getAllResolvingProblemsByCarId(carId);
    let resolvingProblemsIds = resolvingProblems.map(problem => problem.id);
    const pendingProblems = await getAllPendingProblemsByCarId(carId);
    const hasMoreRepairingProblems = problemsIds.length < resolvingProblemsIds.length;
    const hasMoreProblems = pendingProblems.length > 0 || hasMoreRepairingProblems;
    resolvingProblemsIds = problemsIds.filter(rp => resolvingProblemsIds.includes(rp));

    let newCarStatus = null;
    if (hasMoreRepairingProblems) {
      newCarStatus = "REPAIR";
    } else if (hasMoreProblems) {
      newCarStatus = "INFORMED";
    } else {
      const lastEventBeforeRepair = await getLastEventDifferent(carId, ["REPORT_PROBLEM", "REPAIR_REQUEST", "REPAIRED"]);
      if (lastEventBeforeRepair.type === "DRIVER") {
        if (lastEventBeforeRepair.isReserved) {
          newCarStatus = "RESERVED";
        } else {
          newCarStatus = "IN_USE";
        }
      } else {
        newCarStatus = "AVAILABLE";
      }
    }
    
    let repairedEvents = createRepairedEvents(car.id, reportProblems, kilometres);
    await updateCarStatus(car.id, newCarStatus);
    await resolveProblems(resolvingProblemsIds);
    repairedEvents = await Promise.all(repairedEvents);
    await updateLastRepairedEvents(car.id, repairedEvents.map(onlyIds));
  },

  getRepairRequestEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, RepairRequestEvent);
  },
}
