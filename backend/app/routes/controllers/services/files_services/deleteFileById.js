const { Files } = require("../../../../db/index");
const checkCarFiles = require("./checkCarFiles");

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
