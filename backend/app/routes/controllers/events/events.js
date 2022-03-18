const eventService = require("../services/event_services/event");

module.exports = {
  /**
   * Get one @Event by the id, event can be of any type
   * /events/{id} [GET]
   * @param {Number} id
   * @returns 200 and the @Event
   * @returns 404 if the id not exists
   */
  getEventById: async (req, res) => {
    const event = await eventService.getEventDetail(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.sendStatus(404);
    }
  },

  /**
   * Get all @Event of one @Cars by car id
   * /events/car/{id} [GET]
   * @param {Number} id of car
   * @returns 200 and all @Event of car
   */
  getEventsByCarId: async (req, res) => {
    res.status(200).json(await eventService.getEventsByCarId(req.params.id));
  },

  /**
   * Return all events
   * @returns 200 and all @Event
   */
  getAllEvents: async (req, res) => {
    res.status(200).json(await eventService.getAllEvents());
  },
  
}