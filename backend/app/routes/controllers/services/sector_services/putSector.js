const { Sector } = require("../../../../db/index");

/**
 * Finds a sector by id, and updates it
 * 
 * @param {Number} req.params.id 
 * @param {Object} req.body
 * @returns {sector} with the updated information
 */

const putSector = async (req, res) => {
  const { id } = req.params;
  const { nombreLargo, nombreCorto, observaciones } = req.body;
  try {
    Sector.update({ nombreLargo, nombreCorto, observaciones }, { where: { id } });
    const sector = await Sector.findOne({ where: { id } });
    res.status(200).json(sector);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = putSector;
