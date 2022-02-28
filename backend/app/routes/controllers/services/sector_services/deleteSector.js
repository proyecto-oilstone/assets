const { Sector, Cars } = require("../../../../db/index");

const deleteSector = async (req, res) => {
  const { id } = req.params;

  try {
    let car = await Cars.findOne({ where: { SectorId: id } });
    let sector = await Sector.findOne({ where: { id } });

    if (!sector) {
      return res.status(404).send("Sector not found");
    }
    if (car) {
      return res.status(409).send("Sector has cars");
    }

    await Sector.destroy({ where: { id } });
    return res.status(200).json({ message: "Sector deleted" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = deleteSector;
