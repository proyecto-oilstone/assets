const { DriverEvent, Event } = require("../../../../db/index");
const { eventTypes } = require("../../../../utils/constants");

module.exports = {
  /**
   * Return the last event assigned to one car of type DRIVER, can be assigned driver or assigned reserved driver
   * @param {Number} carId 
   * @return {DriverEvent} the last driver event of one car
   * @return {Null} if not found any driver event
   */
  getLastDriverEventByCarId: async (carId) => {
    let query = {
      where: { carId, type: eventTypes['DRIVER'] },
      order: [['createdAt', 'DESC']],
      limit: 1,
      include: DriverEvent,
    };
    let result = await Event.findOne(query);
    if (result) {
      result = { ...result.dataValues, ...result.DriverEvent.dataValues };
      delete result.DriverEvent;
      return result;
    } else {
      return null;
    }
  },
}