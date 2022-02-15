const { VTVEvent, db } = require("../../../../db/index");
const { QueryTypes } = require('sequelize');
const putCar = require("../cars_services/putCar");
const checkCarFiles = require("../files_services/checkCarFiles");
const { postEvent } = require("./event");

module.exports = {
  postVTVEvent: async (event) => {
    const createdEvent = await postEvent(event, VTVEvent);
    await putCar(createdEvent.carId, { VTV: createdEvent.id });
    await checkCarFiles(createdEvent.carId);
    return createdEvent;
  },

  getVTVEventById: async (id) => {
    return VTVEvent.findOne({ where: { id } });
  },

  getNextExpiredEventsByDate: async(endDate) => {
    let now = new Date();
    now = now.toISOString().split('T')[0];
    const format = "YYYY-MM-DD"
    const query = 
    `SELECT id, type, name, "expirationDate" 
    FROM "VTVEvents" 
    WHERE "expirationDate" IS NOT NULL 
    AND TO_DATE("expirationDate", '${format}') BETWEEN TO_DATE('${now}', '${format}') AND TO_DATE('${endDate}', '${format}')`;
    const raw = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return raw;
  }

}
