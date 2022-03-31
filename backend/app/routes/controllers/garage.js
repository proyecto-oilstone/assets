const getGarageDetail = require("./services/garage_services/getGarageDetail");

module.exports = {

  getGarageDetail: async (req, res) => {
    const garage = await getGarageDetail(req.params.id);
    res.status(200).json(garage);
  },
};