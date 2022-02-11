const { db } = require("../../../../db/index");
const { carStates } = require("../../../../utils/constants");

const checkExpirationDates = async () => {
  try {
    const outOfServiceNumber = carStates["EXPIRED_DOCUMENTATION"];
    let now = new Date();
    now = now.toISOString().split('T')[0];
    console.log("updating status of cars...");
    const updateStatusSeguro = `UPDATE "Cars" SET status = ${outOfServiceNumber} WHERE "Cars".id IN 
    ( SELECT c.id FROM "Cars" c 
    JOIN "SeguroEvents" se ON (c.seguro = se.id) 
    WHERE se."expirationDate" IS NOT NULL AND 
    TO_DATE(se."expirationDate", 'YYYY-MM-DD') < TO_DATE('${now}','YYYY-MM-DD') )`;

    const updateStatusVTV = `UPDATE "Cars" SET status = ${outOfServiceNumber} WHERE "Cars".id IN 
    ( SELECT c.id FROM "Cars" c 
    JOIN "VTVEvents" vtve ON (c."VTV" = vtve.id) 
    WHERE vtve."expirationDate" IS NOT NULL AND 
    TO_DATE(vtve."expirationDate", 'YYYY-MM-DD') < TO_DATE('${now}','YYYY-MM-DD') )`;
    await db.sequelize.query(updateStatusSeguro);
    await db.sequelize.query(updateStatusVTV);
    console.log();
    console.log("status of cars updated!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = checkExpirationDates;
