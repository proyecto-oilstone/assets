const driverEventService = require("../services/event_services/driverEvent");
const { Cars,} = require("../../../db/index");

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
        await Cars.update({
            stored: false,
            WorkshopName: null,
            WorkshopId: null,
        }, { where: { id: req.body.carId } });
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

}