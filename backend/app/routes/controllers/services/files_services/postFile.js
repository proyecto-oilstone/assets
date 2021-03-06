const { Files } = require("../../../../db/index");

/**
 * Create a new file
 * @param {String} type
 * @param {String} name
 * @param {Blob} data
 * @param {Number} carId
 * @param {String} expirationDate (optional) default null
 * @returns {File} created
 */

const postFile = async (type, name, data, carId, expirationDate = null) => {
  const document = null; // TODO: what is this?
  return Files.create({type, name, data, CarId: carId, expirationDate, document});
};

module.exports = postFile;
