const { Sector } = require("../../../../db/index");

const postSector = async (req, res) => {
  const { nombreLargo, nombreCorto, observaciones } = req.body;
  console.log(req.body)
  try {
    const sector = await Sector.create({
      nombreLargo,
      nombreCorto,
      observaciones,
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
