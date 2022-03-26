const reportProblemEventService = require("../services/event_services/reportProblemEvent");
const postFile = require("../services/files_services/postFile");

module.exports = {
  /**
   * Post one @ReportProblemEvent
   * /events/report-problems [POST]
   * @param {ReportProblemEvent}
   * @returns 201 and the @ReportProblemEvent created
   * @returns TODO: 403 validation errors
   */
  postReportProblemEvent: async (req, res) => {
    let { prm, data } = req.files;
    const { problemTypeId, description, carId, priority, kilometres } = req.body;
    prm = prm === undefined ? null : prm[0];
    data = data === undefined ? null : data[0];
    if (problemTypeId && description && carId) {
      prm = prm ? await postFile(prm.mimetype, prm.originalname, prm.buffer, carId) : null;
      data = data ? await postFile(data.mimetype, data.originalname, data.buffer, carId) : null;
      const params = {
        prmFileId: prm ? prm.id : null,
        dataFileId: data ? data.id : null,
        problemTypeId,
        description,
        carId,
        priority,
        kilometres,
      };

      const event = await reportProblemEventService.postReportProblemEvent(params);
      if (event) {
        res.status(201).json(event);
      } else {
        res.sendStatus(403);
      }
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
  },

  /**
   * Set the 'resolving' field in true for multiple problems
   * @param {Array} id of problems ids
   * @returns 200 ok if the problems was changed
   * @returns 403 if the car status is not informed
   */
  resolvingProblems: async (req, res) => {
    const problemsIds = req.body.ids;
    const { providerId, estimatedDate, kilometres } = req.body;
    const carId = req.params.id;
    try {
      await reportProblemEventService.resolvingProblems(carId, problemsIds, providerId, estimatedDate, kilometres);
      res.status(200).json({ message: "successful" });
    } catch (e) {
      res.status(403).json({ message: e.message });
    }
  },

}