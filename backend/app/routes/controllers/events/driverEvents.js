const driverEventService = require("../services/event_services/driverEvent");
const { Cars, } = require("../../../db/index");
const getGarageDetail = require("../services/garage_services/getGarageDetail");

module.exports = {
  /**
   * Post one @DriverEvent
   * /events/driver [POST]
   * @param {DriverEvent}
   * @returns 201 and the @DriverEvent created
   * @returns TODO: 400 validation errors
   */
  postDriverEvent: async (req, res) => {
    const params = req.body;
    if (params.isReserved && (params.garageId === null || params.garageId === undefined)) {
      res.sendStatus(403).json({ message: "reserved event should have garageId" });
      return;
    }
    const event = await driverEventService.postDriverEvent(params);
    let stored = event.isReserved;
    let garageName = null;
    let garageId = null;
    if (stored) {
      const garage = await getGarageDetail(event.garageId);
      garageName = garage.nombreCorto; //TODO: remove garageName from Cars
    }

    await Cars.update({
      stored: stored,
      garageName: garageName, //TODO: El garageName no debe estar aca, si el garage cambia de nombre entonces los autos quedan con el nombre viejo y menos si se tiene referencia a "GarageId"
      GarageId: garageId,
      SectorId: params.sectorId, //TODO: el sectorId debe pertenecer al evento, sino no queda en el historial
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