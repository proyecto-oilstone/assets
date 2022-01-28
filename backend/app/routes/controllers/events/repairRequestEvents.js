const repairRequestEventService = require("../services/event_services/repairRequestEvent");

module.exports = {
  /**
   * Post one @RepairRequestEvent
   * /events/repair-requests [POST]
   * @param {RepairRequestEvent}
   * @returns 201 and the @RepairRequestEvent created
   * @returns TODO: 403 validation errors
   */
  postRepairRequestEvent: async (req, res) => {
    const event = await repairRequestEventService.postRepairRequestEvent(req.body);
    if (event) {
      res.status(201).json(event);
    } else {
      res.sendStatus(403);
    }
  },

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