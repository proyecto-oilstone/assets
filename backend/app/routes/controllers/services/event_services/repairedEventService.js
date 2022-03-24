const { LastRepairedEvent, RepairedEvent, Event, ReportProblemEvent, ResolutionType, ProblemType } = require("../../../../db/index");
const { eventTypes } = require("../../../../utils/constants");

module.exports = {
  /**
   * Get the latest @RepairedEvent of one car
   * @param {Number} carId 
   * @returns {Array} latest @RepairedEvent of a car
   */
  getLatestRepairedByCarId: async (carId) => {
    const lastRepairedEvents = await LastRepairedEvent.findAll({ where: { carId }, attributes: ["repairedEventId"] });
    const lastRepairedEventsIds = lastRepairedEvents.map(lre => lre.repairedEventId);
    let query = {
      where: { id: lastRepairedEventsIds },
      include: 
        {
          model: RepairedEvent,
          required: true,
          include: [
            {
              model: ReportProblemEvent,
              required: true,
              include: [
                {
                  model: ProblemType,
                  required: true,
                }
              ]
            },
            {
              model: ResolutionType,
              required: true
            },
          ]
        }
    }
    return Event.findAll(query);
  },
}
