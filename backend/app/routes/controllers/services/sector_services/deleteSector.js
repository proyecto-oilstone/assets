const { Sector, Cars } = require("../../../../db/index");

/**
 * Finds a sector by id, checks if it exists, checks if it has cars, if it doesnt have cars deletes it
 * @param {Number} req.params.id 
 * @returns message with the result of the operation
 */

const deleteSector = async (req, res) => {
  const { id } = req.params;

  try {
    let sector = await Sector.findOne({ where: { id } });
    let cars = await Cars.findOne({ where: { SectorId: id } });

    

    if (!sector) {
      return res.status(404).send("Sector not found");
    }
    if (!cars) {
      await Sector.destroy({ where: { id } });
      return res.status(200).send("Sector deleted");
    }
    
    return res.status(409).send("Sector has cars");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = deleteSector;
