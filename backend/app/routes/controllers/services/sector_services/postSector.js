const { Sector } = require("../../../../db/index");

/**
 * Creates a new sector
 * @param {Object} req.body 
 * @returns {sector} response with the sector created 
 */

const postSector = async (req, res) => {
  const { nombreLargo, nombreCorto, observaciones, supervisor } = req.body;
  try {
    const sector = await Sector.create({
      nombreLargo,
      nombreCorto,
      observaciones,
      supervisor,
    });
    res.status(200).json({
      message: "Sector created",
      sector,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = postSector;
