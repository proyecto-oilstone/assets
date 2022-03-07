const { ReportProblemEvent, Event } = require("../../../../db/index");
const { getEventsByCarIdAndEventType, postEvent } = require("./event");
const getCarDetail = require("../cars_services/getCarDetail");
const { updateCarStatus } = require("../cars_services/updateStatus");

module.exports = {
  postReportProblemEvent: async ({ prm, data, problemTypeId, description, carId }) => {
    const event = {
      carId,
      problemTypeId,
      description,
      resolved: false,
      data: data !== null ? data.buffer : null,
      data_name: data !== null ? data.originalname : null,
      data_type: data !== null ? data.mimetype : null,
      prm: prm !== null ? prm.buffer : null,
      prm_name: prm !== null ? prm.originalname : null,
      prm_type: prm !== null ? prm.mimetype : null,
    }
    const car = await getCarDetail(event.carId);

    let availableStatuses = ["IN_USE", "AVAILABLE", "INFORMED", "REPAIR", "RESERVED"];
    let newCarStatus = "INFORMED";

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

  /**
   * set resolving=true to a list of problems
   * @param {Array} reportsProblemsIds ids of ReportProblemEvent
   */
  resolvingReportsProblems: async (reportsProblemsIds) => {
    return ReportProblemEvent.update({ resolving: true, resolved: false }, { where: { id: reportsProblemsIds } });
  },

  /**
   * Finish to resolve all current resolving problems of one car. one resolving problem is one problem with resolving=true
   * @param {Number} carId 
   */
  resolveProblems: async (reportsProblemsIds) => {
    return ReportProblemEvent.update({ resolving: false, resolved: true }, { where: { id: reportsProblemsIds } });
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

}
