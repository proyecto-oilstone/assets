const seguroEventService = require("../event_services/seguroEvent");
const vtvEventService = require("../event_services/vtvEvent");
const getTotalByStatus = require("./getTotalByStatus");

const dashboardInfo = async (endDate) => {
  const totalByStatus = await getTotalByStatus();
  const seguroEvents = await seguroEventService.getNextExpiredEventsByDate(endDate);
  const vtvEvents = await vtvEventService.getNextExpiredEventsByDate(endDate);
  const response = {
    total: totalByStatus,
    events: { vtv: seguroEvents, seguro: vtvEvents },
  }
  return response;
};

module.exports = dashboardInfo;
