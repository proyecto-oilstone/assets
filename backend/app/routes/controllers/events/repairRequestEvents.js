const repairRequestEventService = require("../services/event_services/repairRequestEvent");

module.exports = {

  /**
   * Get all @RepairRequestEvent of one @Cars by car id
   * /events/car/{id} [GET]
   * @param {Number} id of car
   * @returns 200 and all @RepairRequestEvent of car
   */
  getRepairRequestEventsByCarId: async (req, res) => {
    res.status(200).json(await repairRequestEventService.getRepairRequestEventsByCarId(req.params.id));
  }
}