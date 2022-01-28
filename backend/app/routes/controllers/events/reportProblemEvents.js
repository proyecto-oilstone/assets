const reportProblemEventService = require("../services/event_services/reportProblemEvent");

module.exports = {
  /**
   * Post one @ReportProblemEvent
   * /events/report-problems [POST]
   * @param {ReportProblemEvent}
   * @returns 201 and the @ReportProblemEvent created
   * @returns TODO: 403 validation errors
   */
  postReportProblemEvent: async (req, res) => {
    const event = await reportProblemEventService.postReportProblemEvent(req.body);
    if (event) {
      res.status(201).json(event);
    } else {
      res.sendStatus(403);
    }
  },

  /**
   * Get all @ReportProblemEvent of one @Cars by car id
   * /events/car/{id} [GET]
   * @param {Number} id of car
   * @returns 200 and all @ReportProblemEvent of car
   */
  getReportProblemEventsByCarId: async (req, res) => {
    res.status(200).json(await reportProblemEventService.getReportProblemEventsByCarId(req.params.id));
  }
}