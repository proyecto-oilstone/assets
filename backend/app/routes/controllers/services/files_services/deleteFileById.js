const { Files } = require("../../../../db/index");

const deleteFileById = async (req, res) => {
  const { id } = req.params;
  try {
    await Files.destroy({ where: { id } });
    res.status(204).json({message: "file deleted"});
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = deleteFileById
