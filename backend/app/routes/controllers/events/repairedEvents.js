const repairedEventService = require("../services/event_services/repairedEventService");

module.exports = {

  /**
   * Get the lastest @RepairedEvent events repaired of one @Cars by car id
   * /events/repaired/car/{carId}/latest [GET]
   * @param {Number} id of car
   * @returns 200 and latest @RepairedEvent of car
   */
  getLatestRepairedByCarId: async (req, res) => {
    res.status(200).json(await repairedEventService.getLatestRepairedByCarId(req.params.id));
  },
}