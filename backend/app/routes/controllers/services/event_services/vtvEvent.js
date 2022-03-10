const { VTVEvent, db } = require("../../../../db/index");
const { QueryTypes } = require('sequelize');
const putCar = require("../cars_services/putCar");
const checkCarFiles = require("../files_services/checkCarFiles");
const { postEvent } = require("./event");
const updateFile = require("../files_services/updateFile");

const getVTVEventById = async (id) => {
  return VTVEvent.findOne({ where: { id } });
};


module.exports = {
  postVTVEvent: async (event) => {
    const createdEvent = await postEvent(event, VTVEvent);
    await putCar(createdEvent.carId, { VTV: createdEvent.id });
    await checkCarFiles(createdEvent.carId);
    return createdEvent;
  },

  getVTVEventById,

  getNextExpiredEventsByDate: async(endDate) => {
    let now = new Date();
    now = now.toISOString().split('T')[0];
    const format = "YYYY-MM-DD"
    const query = 
    `SELECT id, "vtvFileId", "expirationDate" 
    FROM "VTVEvents" 
    WHERE "expirationDate" IS NOT NULL 
    AND TO_DATE("expirationDate", '${format}') BETWEEN TO_DATE('${now}', '${format}') AND TO_DATE('${endDate}', '${format}')`;
    const raw = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return raw;
  },

  /**
   * Renove one vtv
   * @param {String} type
   * @param {String} name
   * @param {Blob} data
   * @param {String} expirationDate
   * @param {Number} id
   */
  renove: async ({ type, name, data, expirationDate, id}) => {
    const event = await getVTVEventById(id);
    await updateFile({ id: event.vtvFileId, type, name, data, expirationDate });
  },

}
