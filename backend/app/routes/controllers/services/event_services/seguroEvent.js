const { SeguroEvent, db, Event } = require("../../../../db/index");
const { QueryTypes } = require('sequelize');
const putCar = require("../cars_services/putCar");
const checkCarFiles = require("../files_services/checkCarFiles");
const { postEvent } = require("./event");
const updateFile = require("../files_services/updateFile");

const getSeguroEventById = async (id) => {
  return SeguroEvent.findOne({ where: { id } });
};

module.exports = {
  postSeguroEvent: async (event) => {
    const createdEvent = await postEvent(event, SeguroEvent);
    await putCar(createdEvent.carId, { seguro: createdEvent.id });
    await checkCarFiles(createdEvent.carId);
    return createdEvent;
  },

  getSeguroEventById,

  getNextExpiredEventsByDate: async(endDate) => {
    let now = new Date();
    now = now.toISOString().split('T')[0];
    const format = "YYYY-MM-DD"
    const query = 
    `SELECT id, "seguroFileId", "expirationDate" 
    FROM "SeguroEvents" 
    WHERE "expirationDate" IS NOT NULL 
    AND TO_DATE("expirationDate", '${format}') BETWEEN TO_DATE('${now}', '${format}') AND TO_DATE('${endDate}', '${format}')`;
    const raw = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return raw;
  },
  
  renove: async ({ type, name, data, expirationDate, id}) => {
    const event = await getSeguroEventById(id);
    await updateFile({ id: event.seguroFileId, type, name, data, expirationDate });
  },

  getSeguroEventByFileId: async (fileId) => {
    return SeguroEvent.findOne({ where: { seguroFileId: fileId }, include: Event });
  },
}
