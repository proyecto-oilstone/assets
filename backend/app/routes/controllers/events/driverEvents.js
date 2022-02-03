const driverEventService = require("../services/event_services/driverEvent");

module.exports = {
    /**
     * Post one @DriverEvent
     * /events/driver [POST]
     * @param {DriverEvent}
     * @returns 201 and the @DriverEvent created
     * @returns TODO: 400 validation errors
     */
    postDriverEvent: async (req, res) => {
        const event = await driverEventService.postDriverEvent(req.body);
        if (event) {
            res.status(201).json(event);
        } else {
            res.sendStatus(400);
        }
    },

    /**
     * Get all @DriverEvent of one @Cars by car id
     * /events/car/{id} [GET]
     * @param {Number} id of car
     * @returns 200 and all @DriverEvent of car
     */
    getDriverEventsByCarId: async (req, res) => {
        res.status(200).json(await driverEventService.getDriverEventsByCarId(req.params.id));
    },

    /**
     * Unassign one driver of one car, or unassing one reserved driver of one car
     * /events/unassign/car/{id} [PUT]
     * @param {Number} id of the car to remove the driver 
     * @param {Boolean} isReserved true to remove a reserved driver, false to remove current driver
     */
    unAssignDriverByCarId: async (req, res) => {
        const event = await driverEventService.unAssignDriverByCarId(req.body, req.params.id);
        if (event) {
            res.status(201).json(event);
        } else {
            res.sendStatus(403);
        }
    }
}