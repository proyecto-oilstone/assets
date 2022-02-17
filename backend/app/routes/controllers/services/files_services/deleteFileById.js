const { Files } = require("../../../../db/index");
const checkCarFiles = require("./checkCarFiles");

/**
 * finds a file by id, and deletes it, also checks if the car has files, if it doesn't have files then it sets the car as inactive
 * 
 * @param {Number} req.params.carId 
 * @param {Number} req.params.fileId 
 * @returns message with the result of the operation
 */

const deleteFileById = async (req, res) => {
  const { fileId, carId } = req.params;
  try {
    
    await Files.destroy({ where: { id: fileId } });
    checkCarFiles(carId);
    res.status(200).json({message: "file deleted"});
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = deleteFileById
