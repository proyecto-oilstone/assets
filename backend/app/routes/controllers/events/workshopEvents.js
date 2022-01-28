const workshopService = require("../services/event_services/workshopServiceEvent");

module.exports = {
    /**
     * Post one @WorkshopEvent
     * /events/driver [POST]
     * @param {WorkshopEvent}
     * @returns 201 and the @WorkshopEvent created
     * @returns TODO: 403 validation errors
     */
    postWorkshopEvent: async (req, res) => {
        const event = await workshopService.postWorkshopEvent(req.body);
        if (event) {
            res.status(201).json(event);
        } else {
            res.sendStatus(403);
        }
    },

    /**
     * Get all @WorkshopEvent of one @Cars by car id
     * /events/car/{id} [GET]
     * @param {Number} id of car
     * @returns 200 and all @WorkshopEvent of car
     */
     getWorkshopEventsByCarId: async (req, res) => {
        res.status(200).json(await workshopService.getWorkshopEventsByCarId(req.params.id));
    }
}