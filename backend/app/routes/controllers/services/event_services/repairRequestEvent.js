const { RepairRequestEvent } = require("../../../../db/index");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");
const { getLastDriverEventByCarId } = require("./driverEvent");
const { getEventsByCarIdAndEventType, postEvent } = require("./event");
const { resolvingReportsProblems, getAllPendingProblemsByCarId, getAllResolvingProblemsByCarId, resolveProblems } = require("./reportProblemEvent");

module.exports = {
  postRepairRequestEvent: async (event) => {
    const car = await getCarDetail(event.carId);
    let newCarStatus = null;
    if (event.problems !== null && event.providerId !== null) {
      if (car.status === "INFORMED" || car.status === "REPAIR") {// should be informed first or in repair to create other problem
        newCarStatus = "REPAIR";
      }
    }

    if (newCarStatus) {
      if (event.problems !== null) {
        let problemsNotResolvingIds = await getAllPendingProblemsByCarId(event.carId);
        problemsNotResolvingIds = problemsNotResolvingIds.map(problem => problem.id);
        const onlyCarProblems = (problemId) => problemsNotResolvingIds.some(id => id === problemId);
        const problems = event.problems.filter(onlyCarProblems); // Just in case there is an problemId of another car
        delete event.problems;

        const events = await Promise.all(problems.map(problemId => {
          const params = { ...event, problemId };
          return postEvent(params, RepairRequestEvent);
        }));

        if (events) {
          const reportProblemsIds = events.map(e => e.problemId);
          await updateCarStatus(car.id, newCarStatus);
          await resolvingReportsProblems(reportProblemsIds); // set the problems to resolving=true
          return problemsNotResolvingIds;
        }
      }
    } else {
      return null;
    }
  },

  /**
   * Finish the current resolving problems of one car. If the car still have another problems the status of car
   * will be informed, if the car has not more problems the car status will be available/in use/reserved if has 
   * any driver or reserver driver before repair
   * @param {Number} carId 
   */
  finishCarRepair: async (carId) => {
    const car = await getCarDetail(carId);
    if (car.status !== "REPAIR") throw new Error("nothing to repair");
    const resolvingProblems = await getAllResolvingProblemsByCarId(carId);
    const resolvingProblemsIds = resolvingProblems.map(problem => problem.id);
    const pendingProblems = await getAllPendingProblemsByCarId(carId);
    const hasMoreProblems = pendingProblems.length > 0;
    let newCarStatus = null;
    if (hasMoreProblems) {
      newCarStatus = "INFORMED";
    } else {
      const lastDriverEvent = await getLastDriverEventByCarId(carId);
      if (lastDriverEvent) {
        if (lastDriverEvent.isReserved) {
          newCarStatus = "RESERVED";
        } else {
          newCarStatus = "IN_USE";
        }
      } else {
        newCarStatus = "AVAILABLE";
      }
    }

    await updateCarStatus(car.id, newCarStatus);
    await resolveProblems(resolvingProblemsIds);
  },

  getRepairRequestEventsByCarId: async (carId) => {
    return getEventsByCarIdAndEventType(carId, RepairRequestEvent);
  },
}
