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

const updateFile = async ({id, type, name, data, expirationDate}) => {
  return Files.update({type, name, data, expirationDate}, { where: {id}});
};

module.exports = updateFile;
