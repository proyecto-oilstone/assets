const { db } = require("../../../../db/index");
const { QueryTypes } = require('sequelize');
const { statusCarToString } = require("../../../../utils/functions");
const { carStates } = require("../../../../utils/constants");

const getTotalByStatus = async () => {
  const query = `SELECT status, COUNT(*) FROM "Cars" GROUP BY status;`;
  const rawQuery = await db.sequelize.query(query, { type: QueryTypes.SELECT });
  const totalByStatus = {};
  rawQuery.forEach(row => {
    const status = statusCarToString(row.status);
    totalByStatus[status] = parseInt(row.count);
  });
  Object.keys(carStates).forEach(state => {
    if (totalByStatus[state] === undefined) {
      totalByStatus[state] = 0;
    }
  });

  return totalByStatus;
};

module.exports = getTotalByStatus;
