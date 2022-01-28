const { Sector } = require("../../../../db/index");

const getSectors = async (req, res) => {
  let query = {
    where: {},
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones"],
    order: [["id", "ASC"]],
  };

  let sectors = await Sector.findAll(query);

  sectors = sectors.map((sector) => {
    sector = {
      ...sector.dataValues,
    };
    const { ...rest } = sector;
    return rest;
  });
  sectors = { ...sectors };
  res.status(200).json(sectors);
};

module.exports = getSectors;
